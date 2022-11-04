package egovframework.com.sec.security.filter;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import infomind.com.cmm.service.LogOutSuccessHandler;
import infomind.com.cmm.service.LoginSuccessHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.context.support.WebApplicationContextUtils;


/**
 *
 * @author 공통서비스 개발팀 서준식
 * @since 2011. 8. 29.
 * @version 1.0
 * @see
 *
 * <pre>
 * 개정이력(Modification Information)
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2011. 8. 29.    서준식        최초생성
 *  2017.07.10      장동한       실행환경 v3.7(Spring Security 4.0.3 적용)
 *
 *  </pre>
 */

public class EgovSpringSecurityLogoutFilter implements Filter {

	@SuppressWarnings("unused")
	private FilterConfig config;

	private static final Logger LOGGER = LoggerFactory.getLogger(EgovSpringSecurityLogoutFilter.class);

	public void destroy() {}


	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
			String requestURL = ((HttpServletRequest)request).getRequestURI();


			ApplicationContext act = WebApplicationContextUtils.getRequiredWebApplicationContext(config.getServletContext());
			Map<String, UsernamePasswordAuthenticationFilter> beans = act.getBeansOfType(UsernamePasswordAuthenticationFilter.class);


			LOGGER.debug("LogoutFilter=====>"+requestURL);
	       ((HttpServletRequest)request).getSession().setAttribute("loginVO", null);

//		UsernamePasswordAuthenticationFilter springSecurity = null;
//
//		if (beans.size() > 0) {
//			springSecurity = (UsernamePasswordAuthenticationFilter) beans.values().toArray()[0];
//			springSecurity.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(request.getServletContext().getContextPath() +"/egov_security_logout", "get"));
//			springSecurity.setAuthenticationFailureHandler(new LogOutSuccessHandler());
//
//		} else {
//			LOGGER.error("No AuthenticationProcessingFilter");
//			throw new IllegalStateException("No AuthenticationProcessingFilter");
//		}



		((HttpServletResponse)response).sendRedirect(((HttpServletRequest)request).getContextPath() + "/egov_security_logout?auth_error=2");

	//	chain.doFilter(request, response);


	}

	public void init(FilterConfig filterConfig) throws ServletException {

		this.config = filterConfig;

	}


}
