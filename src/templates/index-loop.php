<div id="fefm-wrap">
	<ul id="fefm-wrap-ul"></ul>
</div>

<ul id="filelist"></ul>
<br />
 
<div id="container">
    <a id="browse" href="javascript:;">[Browse...]</a>
    <a id="start-upload" href="javascript:;">[Start Upload]</a>
</div>

<script id="fefm-single-file-template" type="text/template">
	<li>
		<img width="24" src="<%=file_icon%>" />
		<%=file_name%>
		<%=date_updated%>
		<%=file_sharing_type%>
		<a href="#">Edit</a>
		<a href="#">Delete</a>
		<a href="#">Copy</a>
	</li>
</script>