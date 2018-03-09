@font-face {
  font-weight: normal;
  font-style: normal;
  font-family: 'cmsui';
  src: url("../font/cmsui-font.ttf") format('truetype')
}
 [class^="cmsui-icon-"]:before, [class*=" cmsui-icon-"] {
  font-family: 'cmsui';
  font-style: normal;
  font-weight: normal;
  display: inline-block;
}
<% glyphs.forEach(function(glyph) {%>
  .cmsui-icon-${glyph.code}:before {
    content: '\${glyph.code}';
  }
<% })%>
