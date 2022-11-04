package egovframework.com.cmm.config;

import egovframework.com.cmm.filter.HTMLTagFilter;
import egovframework.com.cmm.filter.SessionTimeoutCookieFilter;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.sec.security.filter.EgovSpringSecurityLoginFilter;
import egovframework.com.uat.uap.filter.EgovLoginPolicyFilter;
import egovframework.com.utl.wed.filter.CkFilter;
import infomind.com.cmm.filter.CmsAjaxFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.filter.HiddenHttpMethodFilter;
import org.springframework.web.multipart.support.MultipartFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;


/**
 * EgovWebApplicationInitializer 클래스
 * <Notice>
 * 	   사용자 인증 권한처리를 분리(session, spring security) 하기 위해서 web.xml의 기능을 
 * 	   Servlet3.x WebApplicationInitializer 기능으로 처리
 * <Disclaimer>
 *		N/A
 *
 * @author 장동한
 * @since 2016.06.23
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자           수정내용
 *  -------      -------------  ----------------------
 *   2016.06.23  장동한           최초 생성
 *   2018.10.02  신용호           Facebook 관련 HiddenHttpMethodFilter 추가
 *   2018.10.26  신용호           EgovLoginPolicyFilter 추가 (IP접근처리)
 *   2018.12.03  신용호           springMultipartFilter,HTMLTagFilter 추가 (XSS방지처리)
 * </pre>
 */


public class EgovWebApplicationInitializer implements WebApplicationInitializer {

	private static final Logger LOGGER = LoggerFactory.getLogger(EgovWebApplicationInitializer.class);
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		LOGGER.debug("EgovWebApplicationInitializer START-============================================");

		//-------------------------------------------------------------
		// Egov Web ServletContextListener 설정
		//-------------------------------------------------------------
		servletContext.addListener(new egovframework.com.cmm.context.EgovWebServletContextListener());

		//-------------------------------------------------------------
		// Spring CharacterEncodingFilter 설정
		//-------------------------------------------------------------
		FilterRegistration.Dynamic characterEncoding = servletContext.addFilter("encodingFilter", new org.springframework.web.filter.CharacterEncodingFilter());
		characterEncoding.setInitParameter("encoding", "UTF-8");
		characterEncoding.setInitParameter("forceEncoding", "true");
		characterEncoding.addMappingForUrlPatterns(null, false, "*");
		//characterEncoding.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "*.do");

		//-------------------------------------------------------------
		// Spring ServletContextListener 설정
		//-------------------------------------------------------------
		XmlWebApplicationContext rootContext = new XmlWebApplicationContext();
		// rootContext.setConfigLocations(new String[] { "classpath*:egovframework/spring/com/**/context-*.xml" });

		if (System.getProperty("spring.profiles.active").contains("production")) {
			rootContext.setConfigLocations("classpath*:egovframework/spring/com/**/context-*.xml",
					"classpath*:infomind/spring/com/**/context-info-*.xml",

					"classpath*:gsis/spring/com/**/context-info-*.xml");
		} else {
			rootContext.setConfigLocations("classpath*:egovframework/spring/com/context-*.xml",
					"classpath*:egovframework/spring/com/scheduling/context-scheduling-sym-bat.xml",
					"classpath*:egovframework/spring/com/scheduling/context-scheduling-sym-sym-bak.xml",
					"classpath*:egovframework/spring/com/idgn/context-*.xml",
					"classpath*:infomind/spring/com/**/context-info-*.xml",

					"classpath*:gsis/spring/com/**/context-info-*.xml");
		}

		rootContext.refresh();
		rootContext.start();

		servletContext.addListener(new ContextLoaderListener(rootContext));

		//-------------------------------------------------------------
		// 인포마인드 CMS aJaxFilter  설정
		//-------------------------------------------------------------
		FilterRegistration.Dynamic aJaxFilter = servletContext.addFilter("aJaxFilter", new CmsAjaxFilter());
		aJaxFilter.addMappingForUrlPatterns(null, false, "/cms/**");

		//-------------------------------------------------------------
		// Spring ServletContextListener 설정
		//-------------------------------------------------------------
		this.addServlet(servletContext, "dispatcher-root", 1,"/", "");

		//-------------------------------------------------------------
		// 인포마인드 CMS PATH Filter  설정
		//-------------------------------------------------------------
		FilterRegistration.Dynamic inCmsPathFilter = servletContext.addFilter("inCmsPathFilter", new DelegatingFilterProxy());
		inCmsPathFilter.addMappingForUrlPatterns(null, true, "*");

		//    servletContext.getServletRegistration ("default").addMapping ("*.js", "*.css", "*.jpg", "*.gif", "*.png");

		if("security".equals(EgovProperties.getProperty("Globals.Auth").trim())) {

			//-------------------------------------------------------------
			// springSecurityFilterChain 설정
			//-------------------------------------------------------------
			FilterRegistration.Dynamic springSecurityFilterChain = servletContext.addFilter("springSecurityFilterChain", new DelegatingFilterProxy());
			springSecurityFilterChain.addMappingForUrlPatterns(null, false, "*");

			//servletContext.addFilter("springSecurityFilterChain", new DelegatingFilterProxy("springSecurityFilterChain")).addMappingForUrlPatterns(null, false, "/*");

			//springSecurityFilterChain.addMappingForServletNames();


			//-------------------------------------------------------------
			// HttpSessionEventPublisher 설정
			//-------------------------------------------------------------
			servletContext.addListener(new org.springframework.security.web.session.HttpSessionEventPublisher());

			//-------------------------------------------------------------
			// EgovSpringSecurityLoginFilter 설정
			//-------------------------------------------------------------
			FilterRegistration.Dynamic egovSpringSecurityLoginFilter = servletContext.addFilter("egovSpringSecurityLoginFilter", new EgovSpringSecurityLoginFilter());
			//로그인 실패시 반활 될 URL설정
			//egovSpringSecurityLoginFilter.setInitParameter("loginURL", "/uat/uia/egovLoginUsr.do");


			egovSpringSecurityLoginFilter.setInitParameter("loginURL", "/cms/LoginUsr.do");




			//로그인 처리 URL설정
			egovSpringSecurityLoginFilter.setInitParameter("loginProcessURL", "/cms/actionLogin.do");
			//처리 Url Pattern
			egovSpringSecurityLoginFilter.addMappingForUrlPatterns(null, false, "*.do");

			//-------------------------------------------------------------
			// EgovSpringSecurityLogoutFilter 설정 (2020-10-19 주석 처리 양진혁)
			//-------------------------------------------------------------
//			FilterRegistration.Dynamic egovSpringSecurityLogoutFilter = servletContext.addFilter("egovSpringSecurityLogoutFilter", new EgovSpringSecurityLogoutFilter());
//			//egovSpringSecurityLogoutFilter.addMappingForUrlPatterns(null, false, "/uat/uia/actionLogout.do");
//			//인포cms 로그인
//			egovSpringSecurityLogoutFilter.addMappingForUrlPatterns(null, false, "/cms/logout.do");





		} else if("session".equals(EgovProperties.getProperty("Globals.Auth").trim())) {
			//-------------------------------------------------------------
			// EgovLoginPolicyFilter 설정
			//-------------------------------------------------------------
			FilterRegistration.Dynamic egovLoginPolicyFilter = servletContext.addFilter("LoginPolicyFilter", new EgovLoginPolicyFilter());
			egovLoginPolicyFilter.addMappingForUrlPatterns(null, false, "/cms/actionLogin.do");

		}




		//-------------------------------------------------------------
		// CkFilter 설정 (CKEditor 사용시 설정)
		//-------------------------------------------------------------
		FilterRegistration.Dynamic regCkFilter = servletContext.addFilter("CKFilter", new CkFilter());
		regCkFilter.setInitParameter("properties", "egovframework/egovProps/ck.properties");
		regCkFilter.addMappingForUrlPatterns(null, false, "/ckupload");

		//-------------------------------------------------------------
		// HiddenHttpMethodFilter 설정 (Facebook OAuth 사용시 설정)
		//-------------------------------------------------------------
		FilterRegistration.Dynamic hiddenHttpMethodFilter = servletContext.addFilter("hiddenHttpMethodFilter", new HiddenHttpMethodFilter());
		hiddenHttpMethodFilter.addMappingForUrlPatterns(null, false, "/*");

		//-------------------------------------------------------------
		// Tomcat의 경우 allowCasualMultipartParsing="true" 추가
		// <Context docBase="" path="/" reloadable="true" allowCasualMultipartParsing="true">
		//-------------------------------------------------------------
		MultipartFilter springMultipartFilter = new MultipartFilter();
		springMultipartFilter.setMultipartResolverBeanName("multipartResolver");
		FilterRegistration.Dynamic multipartFilter = servletContext.addFilter("springMultipartFilter", springMultipartFilter);
		multipartFilter.addMappingForUrlPatterns(null, false, "*");

		//-------------------------------------------------------------
		// HTMLTagFilter의 경우는 파라미터에 대하여 XSS 오류 방지를 위한 변환을 처리합니다.
		//-------------------------------------------------------------
		// HTMLTagFIlter의 경우는 JSP의 <c:out /> 등을 사용하지 못하는 특수한 상황에서 사용하시면 됩니다.
		// (<c:out />의 경우 뷰단에서 데이터 출력시 XSS 방지 처리가 됨)
		FilterRegistration.Dynamic htmlTagFilter = servletContext.addFilter("htmlTagFilter", new HTMLTagFilter());
		htmlTagFilter.addMappingForUrlPatterns(null, false, "*.do");

		//-------------------------------------------------------------	//-------------------------------------------------------------
		//	    // SessionTimeoutCookieFilter는 쿠키에 타임아웃 시간을 기록한다.
		//		//-------------------------------------------------------------
		//	    // latestServerTime - 서버 최근 시간
		//	    // expireSessionTime - 세션이 만료되는 시간
		//		FilterRegistration.Dynamic sessionTimeoutFilter = servletContext.addFilter("sessionTimeoutFilter", new SessionTimeoutCookieFilter());
		//		sessionTimeoutFilter.addMappingForUrlPatterns(null, false, "*.do");
		// SessionTimeoutCookieFilter는 쿠키에 타임아웃 시간을 기록한다.
		//-------------------------------------------------------------
		// latestServerTime - 서버 최근 시간
		// expireSessionTime - 세션이 만료되는 시간
		FilterRegistration.Dynamic sessionTimeoutFilter = servletContext.addFilter("sessionTimeoutFilter", new SessionTimeoutCookieFilter());
		sessionTimeoutFilter.addMappingForUrlPatterns(null, false, "*.do");




		//-------------------------------------------------------------
		// CmsLogFilter 설정 (해당 페이지 정보 가져오기 및 차후 저장처리 등/파라미터 값 로그 관리 추가 ) 임시 주석
		//-------------------------------------------------------------
//		FilterRegistration.Dynamic cmsFilter = servletContext.addFilter("cmsLogFilter", new CmsLogFilter());
//    	cmsFilter.addMappingForUrlPatterns(null, false, "/cms/*");
//		cmsFilter.setInitParameter("subPathFilter","/cms/[^/]+/.*");




		//-------------------------------------------------------------
		// Spring RequestContextListener 설정
		//-------------------------------------------------------------
		servletContext.addListener(new org.springframework.web.context.request.RequestContextListener());

		LOGGER.debug("EgovWebApplicationInitializer END-============================================");
	}

	private void addServlet(ServletContext servletContext, String servletName, int loadOnStartup, String path, String cpath) {
		XmlWebApplicationContext xmlWebApplicationContext = new XmlWebApplicationContext();
		xmlWebApplicationContext.setConfigLocations(
				"/WEB-INF/config/egovframework/springmvc/egov-com-*.xml",
				"classpath*:infomind/spring/mvc/context-info-*.xml",
				"classpath*:gsis/spring/mvc/context-info-*.xml"
		);

		ServletRegistration.Dynamic dispatcher = servletContext.addServlet(servletName, new DispatcherServlet(xmlWebApplicationContext));
		dispatcher.setRunAsRole(path);
		dispatcher.setAsyncSupported(true);
		dispatcher.addMapping(path);
		dispatcher.setLoadOnStartup(loadOnStartup);
		dispatcher.setInitParameter("cpath", cpath);
	}

}
