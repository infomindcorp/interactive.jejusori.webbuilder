package egovframework.com.cmm.pagination;

import egovframework.rte.ptl.mvc.tags.ui.pagination.AbstractPaginationRenderer;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;

public class CmmPaginationRenderer extends AbstractPaginationRenderer implements ServletContextAware {

    private ServletContext servletContext;

    public CmmPaginationRenderer() {

    }

    public void initVariables(){
        firstPageLabel    = "<a href=\"?pageIndex={1}\"  title=\"게시판의 처음으로 이동\" class=\'jump\' onclick=\"{0}({1});return false; \">처음<i class=\"bx bx-chevrons-left \"aria-hidden=\'true\'></i></a>";
        previousPageLabel = "<a href=\"?pageIndex={1}\"  title=\"게시판의 이전 페이지로 이동\" class=\'move\' onclick=\"{0}({1});return false; \">이전<i class=\"bx bx-chevron-left \"aria-hidden=\'true\'></i></a>";
        currentPageLabel  = "<strong>{0}</strong>";
        otherPageLabel    = "<a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \" title=\"게시판의 {2} 페이지로 이동\" >{2}</a>";
        nextPageLabel     = "<a href=\"?pageIndex={1}\" title=\"게시판의 다음 페이지로 이동\" class=\'move\' onclick=\"{0}({1});return false; \">다음<i class=\"bx bx-chevron-right\" aria-hidden=\'true\'></i></a>";
        lastPageLabel     = "<a href=\"?pageIndex={1}\" title=\"게시판의 마지막 페이지로 이동\" class=\'jump\' onclick=\"{0}({1});return false; \">마지막<i class=\"bx bx-chevrons-right\" aria-hidden=\'true\'></i></a>";
    }



    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
        initVariables();
    }

}
