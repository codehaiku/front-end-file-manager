<div id="fefm-pagination-inner-wrap">
<%
function fefm_pagination(c, m) {

    var current = c, last = m,delta = 2,left = current - delta, right = current + delta + 1, range = [], rangeWithDots = [], l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}
%>
	<% if ( num_pages >= 1 ) { %>
		<ul id="fefm-paging-ul">
			<% if ( current_page > 1 ) { %>
				<li>
					<a href="#list/page/<%= parseInt(current_page) - 1 %>">
						<span class="previous">
							<?php esc_html_e('&laquo; Previous', 'front-end-file-manager'); ?>
						</span>
					</a>
				</li>
			<% } %>
			<% var paging = fefm_pagination(parseInt(current_page), num_pages) %>
			<% for( var i = 0 ; i < paging.length; i++) { %>
				<li class="<%= (current_page == paging[i]) ? 'active': 'inactive' %>">
					<% if (typeof paging[i] === 'string') { %>
						<a class="disabled" title="<?php echo esc_html_e("Disabled", "front-end-file-manager"); ?>" href="javascript:void(0);">
							<%=paging[i]%>
						</a>
					<% } else {%>
						<a title="<?php echo esc_html_e("Go to page: ", "front-end-file-manager"); ?><%=paging[i]%>" href="#list/page/<%=paging[i]%>">
							<%=paging[i]%>
						</a>
					<% }%>
				</li>
			<% } %>
			<% if ( current_page < num_pages ) { %>
				<li>
					<a href="#list/page/<%= parseInt(current_page) + 1 %>">
						<span class="next"><?php esc_html_e('Next &raquo;', 'front-end-file-manager'); ?></span>
					</a>
				</li>
			<% } %>
		</ul>
	<% } %>
</div>