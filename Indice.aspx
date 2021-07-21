<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Indice.aspx.cs" Inherits="Indice" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <ext:XScript runat="server">        
        <script src="app2.js" type="text/javascript"></script>
    </ext:XScript>
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="App/leaflet/leaflet.css">

</head>
<body>
    <ext:ResourceManager ID="rm" runat="server" Theme="Crisp" Namespace="LmApp">
        <Listeners>
            <DocumentReady Handler="Eds.init();" />
        </Listeners>
    </ext:ResourceManager>
    <ext:Viewport runat="server" ID="z_ViewPort_Portal" Margin="0" Padding="0" Layout="fit" StyleSpec="border: solid 2px #328481">
        </ext:Viewport>
</body>
</html>
