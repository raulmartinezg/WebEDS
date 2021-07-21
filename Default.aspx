<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Default" %>

<!DOCTYPE html>
<html>
<head id="Head1" runat="server">
    <title>Rastreo de Embarques</title>
    <link rel="icon" type="image/x-icon" href="Imagenes/EDS.ico" />
    <link href="Css/Comun.css" rel="stylesheet" type="text/css" />
    <link href="Css/Default.css" rel="stylesheet" type="text/css" />
    <ext:XScript runat="server">        
        <script src="app.js" type="text/javascript"></script>
    </ext:XScript>
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <style type="text/css">
        .x-panel-default-framed {
            background-color: rgb(249, 232, 12);
            border-color: rgb(249, 232, 12);
        }

        .hideHeader .x-tab-strip-wrap {
            display: none;
        }

        .greeniconcolor {
            color: #006600;
        }

        .rediconcolor {
            color: red;
        }

        .blueiconcolor {
            color: #3300FF;
        }

        .rediconnissan {
            color: #C51F33;
        }

        .orangeiconcolor {
            color: #FF3300;
        }

        .yellowiconcolor {
            color: #FFCC00;
        }

        .progress-0-20 .x-progress-text {
            color: red;
        }

        .progress-20-60 .x-progress-text {
            color: #FE6100;
        }

        .progress-60-100 .x-progress-text {
            color: green;
        }

        .x-progress-default .x-progress-bar-default {
            background: transparent url(./imagenes/pbsample.png) repeat-x left center;
            height: 19px;
            -ms-border-radius: 6px;
            /*-moz-border-radius: 6px -ms-box-sizing border-box;*/
            border-radius: 6px;
            -moz-box-sizing: border-box;
            /*-o-box-sizing: border-box;*/
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        .luma-label-CabDetTitulo {
            font-size: 1em;
            text-align: left;
        }

        .luma-label-CabDetValor {
            font-size: 1em;
            /* font-weight: bold;*/
            border-bottom: 1px solid #191970;
            color: #0073c6;
            padding-bottom: 5px;
            margin: 0;
            text-align: center;
        }

        .custom .x-progress-bar {
            height: 18px;
            -ms-border-radius: 6px;
            /*-moz-border-radius: 6px -ms-box-sizing: border-box;*/
            border-radius: 6px;
            -moz-box-sizing: border-box;
            /*-o-box-sizing: border-box;*/
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border: 1px solid #0073c6;
        }

        .refreshIconCls {
            background-image: url(./Imagenes/stock_id.ico) !important;
        }

        #zFldCntTiempos .x-form-text {
            font-size: 1em;
            border-bottom: 1px solid #191970;
            background-color: transparent;
            color: #0073c6;
            padding-bottom: 5px;
            margin: 0;
            text-align: center;
        }

        .iconcolorwhite {
            color: white;
        }

        .x-grid-row-summary .x-grid-cell-inner {
            font-weight: bold;
            font-size: 1em;
            background-color: #f1f2f4;
        }

        .x-label h1 {
            margin-top: 20px;
        }
    </style>
    <script type="text/javascript">
        var onreset = function () {
            this.up('form').getForm().reset();
        };
    </script>
  

</head>
<body>
    <ext:ResourceManager ID="rm" runat="server" Theme="Crisp" Namespace="LmApp">
        <Listeners>
            <DocumentReady Handler="Eds.init();" />
        </Listeners>
    </ext:ResourceManager>
    <ext:Store ID="z_store_Contactos" runat="server">
        <Model>
            <ext:Model ID="Model6" runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveContacto" Type="String" />
                    <ext:ModelField Name="Nombre" Type="String" />
                    <ext:ModelField Name="Email" Type="String" />
                    <ext:ModelField Name="Titulo" Type="String" />
                    <ext:ModelField Name="Descripcion1" Type="String" />
                    <ext:ModelField Name="Descripcion2" Type="String" />
                    <ext:ModelField Name="Descripcion3" Type="String" />
                    <ext:ModelField Name="Telefono1" Type="String" />
                    <ext:ModelField Name="Telefono2" Type="String" />
                </Fields>
            </ext:Model>
        </Model>
    </ext:Store>
    <ext:Viewport runat="server" ID="z_ViewPort_Portal" Margin="0" Padding="0" StyleSpec="border: solid 2px #328481" Layout="fit">
        <Items>
            <ext:Hidden runat="server" ID="zHidden_Concesionario"></ext:Hidden>
            <ext:Hidden runat="server" ID="zHidden_Perfil"></ext:Hidden>
            <ext:TabPanel ID="zTabPnl_Centro" runat="server" Plain="true" Border="false" MarginSpec="0 3 3 0" ActiveIndex="0" Hidden="False">
                <TopBar>
                    <ext:Toolbar runat="server">
                        <Items>
                            <ext:Label runat="server" ID="zLbl_UsrAcceso" Text=""></ext:Label>
                            <ext:ToolbarFill />
                            <ext:Button ID="zBtn_MnuHerramientaOperacion" runat="server" Icon="Build" Text="Herramientas">
                                <Menu>
                                    <ext:Menu ID="zMenuHOP" runat="server"></ext:Menu>
                                </Menu>
                                <ToolTips>
                                    <ext:ToolTip runat="server" Html="Application" />
                                </ToolTips>
                            </ext:Button>
                            <ext:ToolbarSeparator />
                            <ext:Button ID="zBtn_MnuReportesOperacion" runat="server" Icon="Report" Text="Reporte Operación">
                                <Menu>
                                    <ext:Menu ID="zMenuRepOP" runat="server"></ext:Menu>
                                </Menu>
                                <ToolTips>
                                    <ext:ToolTip runat="server" Html="Application" />
                                </ToolTips>
                            </ext:Button>
                            <ext:ToolbarSeparator />
                            <ext:Button ID="zBtn_MnuReportesCliente" runat="server" Icon="Report" Text="Reporte Ejecutivo">
                                <Menu>
                                    <ext:Menu ID="zMenuRepCli" runat="server"></ext:Menu>
                                </Menu>
                                <ToolTips>
                                    <ext:ToolTip runat="server" Html="Application" />
                                </ToolTips>
                            </ext:Button>
                            <ext:ToolbarSeparator />
                            <ext:Button runat="server" ID="zBtnMnuSoporteAyuda" Icon="Help" Text="Soporte y Ayuda">
                                <Menu>
                                    <ext:Menu runat="server">
                                        <Items>
                                            <ext:MenuItem runat="server" Icon="Help" Text="Ayuda en Línea" Handler="Eds.addTab(LmApp.zTabPnl_Centro, 'z_Tab_Aplicaciones001', 'Help/index.html','Ayuda en Línea','','');" />
                                            <ext:MenuSeparator runat="server" />
                                            <ext:MenuItem runat="server" Icon="PageWhiteAcrobat" Text="Descargar Manual Usuario" OnDirectClick="DescargaManual" />
                                            <ext:MenuSeparator runat="server" />
                                            <ext:MenuItem runat="server" Text="Atención al Cliente" Icon="Phone" Handler="LmApp.zWinAtencionClientes.show();" />
                                            <ext:MenuSeparator runat="server" />
                                            <ext:MenuItem runat="server" Text="Logout" Icon="Exclamation"  OnDirectClick="Unnamed_DirectClick">
                                            </ext:MenuItem>
                                            <%--<ext:MenuSeparator runat="server" />
                                            <ext:MenuItem runat="server" Icon="Accept" Text="Acerca de..." Handler="Datum.Tools.msgConst();" Hidden="True" />--%>
                                        </Items>
                                    </ext:Menu>
                                </Menu>
                                <ToolTips>
                                    <ext:ToolTip runat="server" Html="Application" />
                                </ToolTips>
                            </ext:Button>
                        </Items>
                    </ext:Toolbar>
                </TopBar>
                <Items>
                    <ext:TabPanel runat="server" ID="zTabPnl_RastreoEmbarque" Frame="true" Layout="BorderLayout" Margin="0" Padding="0" TabPosition="Left" Title="Rastreo de Embarques">
                        <Items>
                            <ext:Panel ID="zTab_RastreoEmbarque" runat="server" Title="Búsqueda de Movimientos" Layout="BorderLayout" StyleSpec="border: solid 2px #B7D955">
                                <Items>
                                    <ext:Panel runat="server" ID="pnlBusqNorte" Region="North" Height="44" MaxHeight="150" Header="False" Resizable="false">
                                        <TopBar>
                                            <ext:Toolbar runat="server" ID="Toolbar2" StyleSpec="background-color:white;" Height="40">
                                                <Items>
                                                    <ext:DisplayField runat="server" Text="Guía:" StyleSpec="color:white;padding-left:10px" />
                                                    <ext:TextField ID="txtfld_NumeroGuia" runat="server" Width="60">
                                                    </ext:TextField>
                                                    <ext:DisplayField runat="server" Text="Placas:" StyleSpec="color:white;padding-left:10px" />
                                                    <ext:TextField ID="txtFld_NumeroPlacas" Width="80" runat="server">
                                                    </ext:TextField>
                                                    <ext:Button ID="Button1" runat="server" Text="Más controles" ToolTip="Búsqueda Avanzada" IconCls="fa-plus-circle">
                                                        <Listeners>
                                                            <Click Handler="Eds.tools.redimFiltroPanel(#{pnlBusqNorte})"></Click>
                                                        </Listeners>
                                                    </ext:Button>
                                                    <ext:Button IconCls="fa fa-search iconcolorwhite" ID="btn_Consulta" runat="server" StyleSpec="padding-left:25px;" Text="Consultar" ToolTip="Ejecutar Búsqueda" UI="Primary">
                                                        <Listeners>
                                                            <Click Handler="Eds.cargaDatoViaje()" />
                                                        </Listeners>
                                                    </ext:Button>
                                                    <ext:Button ID="btn_RestConsulta" runat="server" Text="Restablecer" StyleSpec="padding-left:15px;"
                                                        ToolTip="Restablecer criterios de búsqueda" IconCls="fa fa-undo">
                                                        <Listeners>
                                                            <Click Handler="Eds.reiniciaForma('Filtros');" />
                                                        </Listeners>
                                                    </ext:Button>
                                                    <ext:ToolbarFill ID="ToolbarFill1" runat="server" />
                                                    <ext:Button runat="server" IconCls="far fa-arrows-alt-h" Text="Ajustar">
                                                        <Listeners>
                                                            <Click Handler="Eds.tools.redimAnchoColGrid(LmApp.zGrdPnl_RastreoEmbarque);" />
                                                        </Listeners>
                                                    </ext:Button>
                                                    <ext:ToolbarSeparator />
                                                    <ext:Button runat="server" ID="z_Btn_ReporteExcel" IconCls="far fa-file-excel" Text="Reporte" Handler="Eds.rptExportaDatoViaje();" />
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Items>
                                            <ext:FieldSet runat="server" Margin="4" Padding="3" Height="97" Layout="HBoxLayout">
                                                <LayoutConfig>
                                                    <ext:HBoxLayoutConfig Pack="Start" />
                                                </LayoutConfig>
                                                <Items>
                                                    <ext:FieldContainer runat="server" Layout="VBoxLayout">
                                                        <Items>
                                                            <ext:TextField ID="txt_CA_Viaje" EmptyText="No. Viaje" runat="server" Width="160" MarginSpec="5 5 0 5" />
                                                            <ext:TextField ID="txt_CA_Unidad" EmptyText="No. Unidad" runat="server" Width="160" MarginSpec="3 5 0 5" />
                                                            <ext:TextField ID="txt_CA_Concesionario" EmptyText="No. Concesionario" runat="server" LabelWidth="140" Width="160" MarginSpec="3 5 0 5" />
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <ext:FieldContainer runat="server" Layout="VBoxLayout">
                                                        <Items>
                                                            <ext:TextField ID="txt_CA_NoOperador" EmptyText="Numero de Operador" runat="server" Width="160" MarginSpec="5 5 0 5" />
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <ext:FieldContainer runat="server" Layout="VBoxLayout">
                                                        <Items>
                                                            <ext:DateField ID="dtefld_CA_RangoInicial" runat="server" Format="dd-MMM-yyyy" Width="160"
                                                                Vtype="daterange" EnableKeyEvents="true" Text="Fecha Incial" MarginSpec="3 5 0 5" EmptyText="inicial de Despacho"
                                                                EndDateField="dtefld_CA_RangoFinal" Disabled="true">
                                                            </ext:DateField>
                                                            <ext:DateField ID="dtefld_CA_RangoFinal" runat="server" Format="dd-MMM-yyyy" Width="160"
                                                                Vtype="daterange" EnableKeyEvents="true" Text="Fecha Final" MarginSpec="6 5 0 5" EmptyText="Final de Despacho"
                                                                StartDateField="dtefld_CA_RangoInicial">
                                                            </ext:DateField>
                                                        </Items>
                                                    </ext:FieldContainer>
                                                  
                                                </Items>
                                            </ext:FieldSet>
                                        </Items>
                                    </ext:Panel>
                                    <ext:GridPanel ID="zGrdPnl_RastreoEmbarque" Icon="Find" runat="server" Region="Center" Header="False">
                                        <Store>
                                            <ext:Store ID="z_Store_Resultado" runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="placas" Type="String" />
                                                            <ext:ModelField Name="claveUnidad" Type="Int" />
                                                            <ext:ModelField Name="claveFolioViaje" Type="Int" />
                                                            <ext:ModelField Name="folioViaje" Type="String" />
                                                            <ext:ModelField Name="ruta" Type="String" />
                                                            <ext:ModelField Name="unidad" Type="String" />
                                                            <ext:ModelField Name="operador" Type="String" />
                                                            <ext:ModelField Name="destino" Type="String" />
                                                            <ext:ModelField Name="noParadas" Type="int" />
                                                            <ext:ModelField Name="bultos" Type="String" />
                                                            <ext:ModelField Name="fFinCargar" Type="Date" />
                                                            <ext:ModelField Name="inicioViaje" Type="Date" />
                                                            <ext:ModelField Name="llegadaProgramada" Type="Date" />
                                                            <ext:ModelField Name="primerParada" Type="Date" />
                                                            <ext:ModelField Name="ultimaParada" Type="Date" />
                                                            <ext:ModelField Name="estatusFolio" Type="Int" />
                                                            <ext:ModelField Name="porciento" Type="Float" />
                                                            <ext:ModelField Name="porciento2" Type="Float" />
                                                            <ext:ModelField Name="pictograma" Type="int" />
                                                            <ext:ModelField Name="cvEncuesta" Type="int" />
                                                        </Fields>
                                                    </ext:Model>
                                                </Model>
                                            </ext:Store>
                                        </Store>
                                        <ColumnModel runat="server">
                                            <Columns>
                                                <ext:ImageCommandColumn ID="ImageCommandColumn1" runat="server" Width="40" Sortable="true">
                                                    <Commands>
                                                        <ext:ImageCommand CommandName="Ubicacion" IconCls="fa fa-street-view blueiconcolor2">
                                                            <ToolTip Text="Ubicación en Mapa" />
                                                        </ext:ImageCommand>
                                                    </Commands>
                                                    <PrepareCommand Fn="Eds.mapa.marcaPosicionUltima" />
                                                    <Listeners>
                                                        <Command Handler="Eds.gestorNavegacionTabuladores('zTabPnl_Ubicacion');Eds.mapa.marcaPosicionUnidad(record.data);" />
                                                    </Listeners>
                                                </ext:ImageCommandColumn>
                                                <ext:ProgressBarColumn runat="server" DataIndex="porciento2" Text="Avance" Width="80">
                                                    <Renderer Fn="Eds.estiloEtiquetaProgress" />
                                                </ext:ProgressBarColumn>
                                                <ext:Column Align="Center" DataIndex="pictograma" ItemID="ClmETAAsA" Resizable="true" runat="server" Text="_" Width="70">
                                                    <Renderer Fn="Eds.iconoEstatusViaje" />
                                                </ext:Column>
                                                <ext:ImageCommandColumn ID="ImageCommandColumn2" runat="server" Width="40" Sortable="true">
                                                    <Commands>
                                                        <ext:ImageCommand CommandName="RepCalidad" IconCls="fa fa-files-o  blueiconcolor2">
                                                            <ToolTip Text="Reporte Calidad" />
                                                        </ext:ImageCommand>
                                                    </Commands>
                                                    <PrepareCommand Fn="Eds.ocultaEncuesta" />
                                                    <Listeners>
                                                        <Command Handler="Eds.gestorNavegacionTabuladores('zTabPnlEncuesta');Eds.cargaReporteCalidad(record.data);" />
                                                    </Listeners>
                                                </ext:ImageCommandColumn>
                                                <ext:Column runat="server" Text="Placas" DataIndex="placas" Align="Center" Width="72" />
                                                <ext:Column runat="server" Text="Unidad" DataIndex="unidad" Resizable="true" Align="Center" Width="75" />
                                                <ext:Column runat="server" Text="Folio Viaje" DataIndex="folioViaje" Resizable="true" Align="Center" Width="95" />
                                                <ext:Column runat="server" Text="Ruta" DataIndex="ruta" Resizable="true" Align="Left" Width="173" />
                                                <ext:Column runat="server" Text="Operador" DataIndex="operador" Resizable="true" Align="Left" Width="278" />
                                                <ext:NumberColumn runat="server" Text="Itinerario/  </br>Paradas" DataIndex="noParadas" Resizable="True" Format="#" Width="100" />
                                                <ext:Column runat="server" Text="Destino Final" DataIndex="destino" Resizable="true" Align="Left" Width="201" />
                                                <ext:DateColumn runat="server" Text="Fecha Despacho" DataIndex="fFinCargar" Resizable="true" Align="Left" ToolTip="Fecha Carga Unidad"
                                                    Format="dd-MMM-Y H:i:s" Width="150" />
                                                <ext:DateColumn runat="server" Text="Inicio de Viaje" DataIndex="inicioViaje" Resizable="true" Align="Left"
                                                    Format="dd-MMM-Y H:i:s" Width="150" />
                                                <ext:DateColumn runat="server" Text="Primer Entrega" DataIndex="primerParada" Resizable="true" Align="Left"
                                                    Format="dd-MMM-Y H:i:s" Width="160" />
                                                <ext:DateColumn runat="server" Text="Última Entrega" DataIndex="ultimaParada" Resizable="true" Align="Left"
                                                    Format="dd-MMM-Y H:i:s" Width="160" />
                                                <%-- <ext:DateColumn runat="server" ItemID="ClmRuta2" Text="Llegada Programada" DataIndex="LlegadaProgramada" Resizable="true" Align="Left"
                                                Format="dd-MMM-Y H:i:s" Width="160" />
                                                <ext:Column runat="server" ItemID="ClmLatitud" Text="Latitud" DataIndex="Latitud" Resizable="false" Hidden="true" Align="Center" Width="40" />
                                                <ext:Column runat="server" ItemID="ClmLongitud" Text="Longitud" DataIndex="Longitud" Resizable="false" Hidden="true" Align="Center" Width="40" />
                                                <ext:Column runat="server" ItemID="ClmLocalidad" Text="Localidad" DataIndex="Localidad" Resizable="false" Hidden="true" Align="Center" Width="40" />
                                                <ext:DateColumn runat="server" ItemID="ClmFechaPosicion" Text="FechaPosicion" DataIndex="FechaPosicion" Resizable="false" Hidden="true"
                                                    Align="Center" Format="dd-MMM-Y H:i:s" Width="40" />--%>
                                            </Columns>
                                        </ColumnModel>
                                        <Listeners>
                                            <CellDblClick Handler="Eds.cargaDetalleViaje(record.data);"></CellDblClick>
                                            <ItemContextMenu Fn="Eds.cargaMenuContextualViajes" />
                                        </Listeners>
                                        <View>
                                            <ext:GridView runat="server" ID="z_GrdView_Resultado" />
                                        </View>
                                    </ext:GridPanel>
                                </Items>
                            </ext:Panel>
                            <ext:Panel runat="server" ID="TabDetalles" Title="Detalle del Viaje" Border="true" Layout="BorderLayout" StyleSpec="border: solid 2px #FF4842">
                                <Items>
                                    <ext:FieldSet runat="server" Region="North" Padding="2" MarginSpec="2 2 2 2" Layout="HBoxLayout" StyleSpec="background:transparent" Border="true">
                                        <Items>
                                            <ext:FieldSet runat="server" Layout="VBoxLayout" Padding="0" Border="True" Width="400" MarginSpec="1 1 1 1">
                                                <Items>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Viaje: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="lbl_NumeroViaje" Width="102" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                            <ext:Label runat="server" Text="Unidad: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="lbl_NumeroUnidad" Width="62" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                            <ext:Label runat="server" Text="Placas: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="lbl_PlacaUnidad" Width="94" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Operador: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="lbl_NombreOperador" Width="320" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Ruta: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="lbl_Ruta" Width="240" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Itinerario / Paradas: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="txt_Arribos" Width="112" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                            <ext:Label runat="server" Text="Paquetes " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="txt_Items" Width="102" Text="-" Cls="luma-label-CabDetValor"></ext:Label>

                                                            <%--<ext:TextField runat="server" ID="" FieldLabel="Arribos"></ext:TextField>
                                                        <ext:TextField runat="server" ID="" FieldLabel="Sku's/Cantidad"></ext:TextField>--%>
                                                        </Items>
                                                    </ext:FieldContainer>
                                                </Items>
                                            </ext:FieldSet>
                                            <ext:Container runat="server" MarginSpec="2 2 2 2" Layout="VBoxLayout" Width="120">
                                                <Items>
                                                    <ext:Button ID="z_btn_Actualizar" runat="server" Text="Actualizar" UI="Warning" IconCls="fa fa-refresh blackiconcolor" MarginSpec="8 0 0 0">
                                                        <Listeners>
                                                            <Click Handler="Eds.cargaDetalleViaje(Eds.getFVSeleccionado())"></Click>
                                                        </Listeners>
                                                    </ext:Button>
                                                    <ext:Button ID="z_btn_DetalleRegresar" runat="server" Text="Regresar" IconCls="fa fa-arrow-left iconcolorwhite" MarginSpec="4 0 0 0" UI="Success" Handler="Eds.gestorNavegacionTabuladores('zTab_RastreoEmbarque');" />
                                                    <ext:Button runat="server" ID="zDomServRegEven" IconCls="fa fa-clock-o iconcolorwhite" MarginSpec="8 0 0 0" ToolTip="Registrar Eventos" Text="Cronograma">
                                                        <Menu>
                                                            <ext:Menu runat="server">
                                                                <Items>
                                                                    <ext:MenuSeparator runat="server" />
                                                                    <ext:FieldContainer
                                                                        runat="server"
                                                                        Layout="VBoxLayout" Margin="4" ID="zFldCntTiempos">
                                                                        <Defaults>
                                                                            <ext:Parameter Name="LabelWidth" Value="120" Mode="Raw"></ext:Parameter>
                                                                            <ext:Parameter Name="HideLabel" Value="false" Mode="Raw" />
                                                                        </Defaults>
                                                                        <Items>
                                                                            <ext:TextField runat="server" ID="zTxtFld_FInicioCarga" FieldLabel="Inicio de Carga"></ext:TextField>
                                                                            <ext:TextField runat="server" ID="zTxtFld_FFinCarga" FieldLabel="Fin de Carga"></ext:TextField>
                                                                            <ext:TextField runat="server" ID="zTxtFld_FSalidaProgramada" FieldLabel="Salida Programada"></ext:TextField>
                                                                            <ext:TextField runat="server" ID="zTxtFld_FSalidaReal" FieldLabel="Salida Real"></ext:TextField>
                                                                            <ext:TextField runat="server" ID="zTxtFld_FFinServicio" FieldLabel="Último Servicio"></ext:TextField>
                                                                            <ext:TextField runat="server" ID="txt_TiempoRutaProgramado" FieldLabel="Tiempo de Ruta Estimado"></ext:TextField>
                                                                            <ext:TextField runat="server" ID="txt_TiempoRutaReal" FieldLabel="Tiempo de Ruta Real"></ext:TextField>
                                                                        </Items>
                                                                    </ext:FieldContainer>
                                                                </Items>
                                                            </ext:Menu>
                                                        </Menu>
                                                    </ext:Button>
                                                </Items>
                                            </ext:Container>
                                            <ext:ProgressBar ID="Progress4" runat="server" Width="200" Text="-" Cls="custom" UI="Success" />
                                        </Items>
                                    </ext:FieldSet>
                                    <ext:GridPanel ID="z_GrdPnl_Tiempos" Title="Tiempo de Entrega" Header="False" runat="server" Border="true" Region="Center">
                                        <TopBar>
                                            <ext:Toolbar ID="Toolbar1" runat="server" Margin="0" Padding="0">
                                                <Items>
                                                    <ext:Label ID="Label1" runat="server" Text="Flujo del Itinerario de Viaje" StyleSpec="color:#166DEF;font-weight: bold;" />
                                                    <ext:ToolbarFill ID="ToolbarFill2" runat="server" />
                                                    <ext:Button runat="server" IconCls="fa fa-arrows-h" Text="Ajustar">
                                                        <Listeners>
                                                            <Click Handler="Eds.tools.redimAnchoColGrid(LmApp.z_GrdPnl_Tiempos);" />
                                                        </Listeners>
                                                    </ext:Button>
                                                    <ext:ToolbarSeparator />
                                                    <ext:Button runat="server" ID="zBtn_ExportaDetalleViaje" IconCls="fa fa-file-excel-o" Text="Reporte" Handler="Eds.rptExportaDetalleViaje();" />
                                                    <ext:ToolbarSeparator />
                                                    <ext:Button ID="MenuButton" runat="server" Text="Ubicación" Icon="MapEdit">
                                                        <Menu>
                                                            <ext:Menu runat="server" ID="menuRastreo">
                                                                <Items>
                                                                    <ext:CheckMenuItem ID="z_Mnu_UltPos" IconUrl="/Imagenes/Hino3.png" runat="server" Checked="true" Text="Última Posición" CheckHandler="Eds.selectorMarcasMapa" />
                                                                    <ext:CheckMenuItem ID="z_Mnu_SecSis" Icon="FlagChecked" runat="server" Text="Secuencia en Sistema" CheckHandler="Eds.mapa.selectorMarcasMapa" />
                                                                    <ext:CheckMenuItem ID="z_Mnu_SecReal" IconUrl="/Imagenes/MarkerBallAzul.ico" runat="server" Text="Secuencia Real" CheckHandler="Eds.mapa.selectorMarcasMapa" />
                                                                </Items>
                                                            </ext:Menu>
                                                        </Menu>
                                                    </ext:Button>
                                                    <ext:ToolbarSeparator />
                                                    <ext:Button runat="server" ID="z_btn_DetalleVerMapa" Text="Consultar" Width="100" Icon="MapGo" Disabled="True">
                                                        <Listeners>
                                                            <Click Handler="Eds.mapa.gestorMarcasMapa();" />
                                                        </Listeners>
                                                    </ext:Button>
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Store>
                                            <ext:Store ID="z_Store_TiempoEntrega" runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="secuencia" Type="Int" />
                                                            <ext:ModelField Name="numeroConcesionario" Type="String" />
                                                            <ext:ModelField Name="concesionario" Type="String" />
                                                            <ext:ModelField Name="ciudad" Type="String" />
                                                            <ext:ModelField Name="totalOrdenEmbarque" Type="Int" />
                                                            <ext:ModelField Name="llegadaEstimada" Type="Date" />
                                                            <ext:ModelField Name="llegadaReal" Type="Date" />
                                                            <ext:ModelField Name="evalLlegada" Type="String" />
                                                            <ext:ModelField Name="salidaEstimada" Type="Date" />
                                                            <ext:ModelField Name="salidaReal" Type="Date" />
                                                            <ext:ModelField Name="estanciaConc" Type="String" />
                                                            <ext:ModelField Name="personaRecibe" Type="String" />
                                                            <ext:ModelField Name="claveFolioViaje" Type="Int" />
                                                            <ext:ModelField Name="latitud" Type="Float" />
                                                            <ext:ModelField Name="longitud" Type="Float" />
                                                        </Fields>
                                                    </ext:Model>
                                                </Model>
                                                <Sorters>
                                                    <ext:DataSorter Direction="ASC" Property="secuencia"></ext:DataSorter>
                                                </Sorters>
                                            </ext:Store>
                                        </Store>
                                        <ColumnModel runat="server" Margin="0">
                                            <Columns>
                                                <ext:Column Align="Center" DataIndex="secuencia" ID="Column1" ItemID="ClmSecuencia" Locked="True" Resizable="true" runat="server" Text="Sec" Width="40" />
                                                <ext:ImageCommandColumn runat="server" Sortable="true" Width="20" Align="Center">
                                                    <Commands>
                                                        <ext:ImageCommand IconCls="fa fa-map-marker rediconnissan" CommandName="Ubicacion">
                                                            <ToolTip Text="Ubicación en Mapa" />
                                                        </ext:ImageCommand>
                                                    </Commands>
                                                    <PrepareCommand Fn="Eds.preparaComandoPosConc" />
                                                    <Listeners>
                                                        <Command Handler="Eds.gestorNavegacionTabuladores(LmApp.zTabPnl_Ubicacion.id);Eds.mapa.marcaPosicionConcesionario(record.data);" />
                                                    </Listeners>
                                                </ext:ImageCommandColumn>
                                                <ext:Column Align="Center" DataIndex="numeroConcesionario" ItemID="ClmNumeroConcesionario" Locked="True" Resizable="true" runat="server" Text="Distribuidor" Width="80" />
                                                <ext:Column Align="Left" DataIndex="concesionario" ItemID="ClmConcesionario" Locked="True" Resizable="true" runat="server" Text="Nombre Distribuidor" Width="200" />
                                                <ext:BooleanColumn runat="server" Text="E" DataIndex="citaConf" Width="40">
                                                    <Renderer Fn="Eds.setEstiloCelda01" />
                                                </ext:BooleanColumn>
                                                <ext:ImageCommandColumn runat="server" Sortable="true" Text="Ent" Width="20" Align="Center">
                                                    <Commands>
                                                        <ext:ImageCommand IconCls="icon-barcode" CommandName="Terminal">
                                                            <ToolTip Text="Entrega electrónica" />
                                                        </ext:ImageCommand>
                                                    </Commands>
                                                    <PrepareCommand Fn="Eds.preparaComandoEntregaElectronica" />
                                                    <Listeners>
                                                        <Command Fn="Eds.cargaDetalleEmbarque" />
                                                    </Listeners>
                                                </ext:ImageCommandColumn>

                                                <ext:Column Align="Left" DataIndex="ciudad" ItemID="ClmCiudad" Resizable="true" runat="server" Text="Ciudad" Width="100" />
                                                <ext:Column runat="server" ItemID="ClmCantEmb" Text="Guías" DataIndex="totalOrdenEmbarque" Resizable="true" Align="Center" Width="66" />
                                                <ext:DateColumn Align="Left" DataIndex="llegadaEstimada" Format="dd-MMM-Y H:i:s" ID="Column5" ItemID="ClmLlegadaEstimada" Resizable="true" runat="server" Text="Llegada Estimada" Width="149" />
                                                <ext:DateColumn ID="Column6" runat="server" ItemID="ClmLlegadaReal" Text="Llegada Real" DataIndex="llegadaReal" Resizable="true" Align="Left" Format="dd-MMM-Y H:i:s" Width="149">
                                                    <Renderer Fn="Eds.renderColLlegaTarde" />
                                                </ext:DateColumn>
                                                <ext:Column Align="Left" DataIndex="evalLlegada" Hidden="True" ID="Column7" ItemID="ClmEvalLlegada" Resizable="true" runat="server" Text="Evaluación de Arribo" Width="40" />
                                                <ext:DateColumn Align="Left" DataIndex="salidaEstimada" Format="dd-MMM-Y H:i:s" ID="Column8" ItemID="ClmSalidaEstimada" Resizable="true" runat="server" Text="Salida Estimada" Width="149" />
                                                <ext:DateColumn Align="left" DataIndex="salidaReal" Format="dd-MMM-Y H:i:s" ID="Column9" ItemID="ClmSalidaReal" Resizable="true" runat="server" Text="Salida Real" Width="149" />
                                                <ext:Column Align="Left" DataIndex="estanciaConc" ID="Column10" ItemID="ClmEstanciaConc" Resizable="true" runat="server" Text="Estancia en </br> Distribuidor" Width="106" />
                                                <ext:Column Align="Left" DataIndex="personaRecibe" ID="Column11" ItemID="ClmPersonaRecibe" Resizable="true" runat="server" Text="Recibe Material" Width="150" />
                                                <ext:Column Align="Left" DataIndex="claveFolioViaje" Hidden="true" ID="Column12" ItemID="ClmClaveFolioViaje" Resizable="true" runat="server" Text="Clave Folio Viaje" Width="40" />
                                            </Columns>
                                        </ColumnModel>
                                        <Listeners>
                                            <CellDblClick Handler="Eds.cargaDetalleEmbarque(item, 'ImgCmdDetalle', record);"></CellDblClick>
                                        </Listeners>
                                        <ViewConfig>
                                            <Listeners>
                                                <%-- <Refresh Fn="function (dataview) {Ext.each(dataview.panel.columns, function(column) {column.autoSize();});}"></Refresh>--%>
                                            </Listeners>
                                        </ViewConfig>
                                    </ext:GridPanel>
                                    <%-- <ext:Panel runat="server" Layout="HBoxLayout" Region="South" Height="200" Split="True" Collapsible="True" Collapsed="True" Header="False" TitleCollapse="true" Title="Ver Gráficos de desempeño >>>" Icon="ChartCurve" Resizable="false">
                                    <LayoutConfig>
                                        <ext:HBoxLayoutConfig Align="Stretch" />
                                    </LayoutConfig>
                                    <Items>
                                        <ext:Panel runat="server" Flex="1" Layout="Fit">
                                            <Items>
                                                <ext:PolarChart ID="z_Chart_PorcientoEntrega" InsetPadding="19" runat="server">
                                                    <Background Fill="#E0E0E0" />
                                                    <Store>
                                                        <ext:Store ID="z_Store_PorcientoEntrega" runat="server">
                                                            <Model>
                                                                <ext:Model ID="Model3" runat="server">
                                                                    <Fields>
                                                                        <ext:ModelField Name="Porciento" Type="Int" />
                                                                    </Fields>
                                                                </ext:Model>
                                                            </Model>
                                                        </ext:Store>
                                                    </Store>
                                                    <Items>
                                                        <ext:TextSprite
                                                            Text="% Completado"
                                                            X="30"
                                                            Y="30"
                                                            FontSize="17" />
                                                    </Items>
                                                    <Axes>
                                                        <ext:NumericAxis Position="Gauge" Minimum="0" Maximum="100" MajorTickSteps="10" Margin="0" />
                                                    </Axes>
                                                    <Series>
                                                        <ext:GaugeSeries Field="Porciento" Donut="20" Colors="#32CD32,#ddd" TotalAngleDegrees="180" />
                                                    </Series>
                                                </ext:PolarChart>
                                            </Items>
                                        </ext:Panel>
                                        <ext:PolarChart Flex="1" ID="z_Chart_NivelServicio" Layout="FitLayout" runat="server" Shadow="true">
                                            <Background Fill="#E0E0E0" />
                                            <LegendConfig runat="server" Dock="Right" />
                                            <Store>
                                                <ext:Store ID="z_Store_NivelServicio" runat="server" AutoDataBind="true">
                                                    <Model>
                                                        <ext:Model ID="Model5" runat="server">
                                                            <Fields>
                                                                <ext:ModelField Name="Nombre" />
                                                                <ext:ModelField Name="Valor" />
                                                            </Fields>
                                                        </ext:Model>
                                                    </Model>
                                                </ext:Store>
                                            </Store>
                                            <Items>
                                                <ext:TextSprite
                                                    Text="Nivel de Servicio"
                                                    X="30"
                                                    Y="30"
                                                    FontSize="17" />
                                            </Items>
                                            <Interactions>
                                                <ext:ItemHighlightInteraction />
                                                <ext:RotateInteraction />
                                            </Interactions>
                                            <Series>
                                                <ext:PieSeries XField="Valor" ShowInLegend="True" Donut="0" HighlightMargin="10" Colors="#8BB63F,#C81A3A" Rotation="30" ShowMarkers="False">
                                                    <Label Field="Nombre" FontSize="8" FontFamily="Calibri" />
                                                </ext:PieSeries>
                                            </Series>
                                        </ext:PolarChart>
                                    </Items>
                                </ext:Panel>--%>
                                </Items>
                            </ext:Panel>
                            <ext:FormPanel runat="server" ID="zTabPnlEncuesta" Title="Encuesta de Calidad" Border="true" Layout="VBoxLayout" StyleSpec="border: solid 2px #FF4842">
                                <FieldDefaults LabelWidth="110" LabelStyle="color:black;padding-left:4px;" />
                                <TopBar>
                                    <ext:Toolbar runat="server">
                                        <Items>
                                            <ext:ToolbarSeparator />
                                            <ext:Button ID="zBtnRetornar" runat="server" Text="Regresar" IconCls="fa fa-arrow-left iconcolorwhite" UI="Success" Handler="Eds.gestorNavegacionTabuladores(null);" />
                                            <ext:ToolbarSeparator />
                                            <ext:Button ID="zbtnEncustaCalidad" runat="server" Text="Guardar" Icon="Disk">
                                                <Listeners>
                                                    <Click Handler="Eds.enviaEncuestaCalidad();" />
                                                </Listeners>
                                            </ext:Button>
                                            <ext:ToolbarSeparator />
                                            <ext:Button runat="server" ID="zReset" Text="Reset" Icon="ArrowRefresh">
                                                <Listeners>
                                                    <Click Fn="Eds.resetFormulario" />
                                                </Listeners>
                                            </ext:Button>
                                            <ext:ToolbarSeparator />
                                        </Items>
                                    </ext:Toolbar>
                                </TopBar>
                                <Items>
                                    <ext:FieldSet runat="server" Padding="5" MarginSpec="2 2 2 2" Layout="VBoxLayout" StyleSpec="background:transparent" Border="true">
                                        <Items>
                                            <ext:FieldSet runat="server" Layout="HBoxLayout" Padding="0" Border="false" Flex="1" MarginSpec="1 2 1 1">
                                                <Items>
                                                    <ext:FieldSet runat="server" Layout="VBoxLayout" Padding="0" Border="false" Flex="1" MarginSpec="1 2 1 1">
                                                        <Items>
                                                            <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                                <Items>
                                                                    <ext:Label runat="server" Text="Nombre Distribuidor: " Cls="luma-label-CabDetTitulo" MarginSpec="0 5 0 0" />
                                                                    <ext:Label runat="server" ID="zlbl_NomCon" Width="300" Text="-" Cls="luma-label-CabDetValor" MarginSpec="0 5 0 0" />
                                                                </Items>
                                                            </ext:FieldContainer>
                                                            <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                                <Items>
                                                                    <ext:Label runat="server" Text="Número Distribuidor : " Cls="luma-label-CabDetTitulo" MarginSpec="0 5 0 0"></ext:Label>
                                                                    <ext:Label runat="server" ID="zlbl_NumCon" Width="300" Text="-" Cls="luma-label-CabDetValor" MarginSpec="0 5 0 0" />
                                                                    <ext:TextField runat="server" ID="ztxt_CVcon" Width="30" Text="-" Cls="luma-label-CabDetValor" Hidden="True" />

                                                                </Items>
                                                            </ext:FieldContainer>
                                                        </Items>
                                                    </ext:FieldSet>
                                                    <ext:FieldSet runat="server" Layout="VBoxLayout" Padding="0" Border="false" Flex="1" MarginSpec="1 2 1 1">
                                                        <Items>
                                                            <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                                <Items>
                                                                    <ext:Label runat="server" Text="Nombre del Operador: " Cls="luma-label-CabDetTitulo" MarginSpec="0 10 0 0" />
                                                                    <ext:Label runat="server" ID="zlbl_NomOpe" Width="300" Text="-" Cls="luma-label-CabDetValor" />
                                                                </Items>
                                                            </ext:FieldContainer>
                                                            <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                                <Items>
                                                                    <ext:Label runat="server" Text="Viaje: " Cls="luma-label-CabDetTitulo" MarginSpec="0 5 0 0" Hidden="True" />
                                                                    <ext:Label runat="server" ID="zlbl_FV" Width="90" Text="-" Cls="luma-label-CabDetValor" MarginSpec="0 0 0 5" Hidden="True" />
                                                                    <ext:TextField runat="server" ID="ztxt_CVFV" Width="20" Text="-" Cls="luma-label-CabDetValor" Hidden="True" />
                                                                    <ext:Label runat="server" Text="Unidad: " Cls="luma-label-CabDetTitulo" MarginSpec="0 5 0 0" />
                                                                    <ext:Label runat="server" ID="zlbl_Unidad" Width="70" Text="-" Cls="luma-label-CabDetValor" MarginSpec="0 0 0 5" />
                                                                    <ext:Label runat="server" Text="Placas: " Cls="luma-label-CabDetTitulo" MarginSpec="0 5 0 0" />
                                                                    <ext:Label runat="server" ID="zlbl_Placa" Width="98" Text="-" Cls="luma-label-CabDetValor" />
                                                                </Items>
                                                            </ext:FieldContainer>
                                                        </Items>
                                                    </ext:FieldSet>
                                                </Items>
                                            </ext:FieldSet>
                                            <ext:FieldSet runat="server" Layout="HBoxLayout" Padding="0" Border="false" Flex="1" MarginSpec="1 2 1 1">
                                                <Items>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Guías : " Cls="luma-label-CabDetTitulo" MarginSpec="0 5 0 0"></ext:Label>
                                                            <ext:Label runat="server" ID="zLbl_Tguias" Width="830" Text="-" Cls="luma-label-CabDetValor" MarginSpec="0 5 0 0" />
                                                        </Items>
                                                    </ext:FieldContainer>
                                                </Items>
                                            </ext:FieldSet>
                                        </Items>
                                    </ext:FieldSet>
                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" MarginSpec="10 10 10 10" AnchorHorizontal="100%">
                                        <Items>
                                            <ext:Label runat="server" Height="25" Html="La calificación que usted otorgue sera tomada en cuenta para evaluar el desempeño del operador por lo que sugerimos absoluta seriedad al momento de calificar."
                                                StyleSpec=" background: #0073c6; border:solid 5px #0073c6; color: white; font-weight: bold; font-size: 14px; margin-left:20px;" />
                                        </Items>
                                    </ext:FieldContainer>
                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" MarginSpec="10 10 10 10" AnchorHorizontal="100%">
                                        <Items>
                                            <ext:Label runat="server" Height="25" Html="Evaluación de entrega por viaje"
                                                StyleSpec="  color:#330099; font-weight: bold; font-size: 22px; margin-left:320px;" />
                                        </Items>
                                    </ext:FieldContainer>
                                    <ext:FieldSet runat="server" Layout="hBoxLayout" Border="true" Padding="5" MarginSpec="2 2 2 2">
                                        <Items>
                                            <ext:FieldSet runat="server" Title="" Layout="AnchorLayout" Collapsible="False" Width="450" Border="false">
                                                <Items>
                                                    <ext:RadioGroup ID="RGroup1" runat="server" GroupName="RGroup1" LabelWidth="300" FieldLabel="1.- Se cumple con el horario de entrega" Cls="x-check-group-alt">
                                                        <Items>
                                                            <ext:Radio runat="server" BoxLabel="SI" InputValue="1" Checked="true" />
                                                            <ext:Radio runat="server" BoxLabel="NO" InputValue="2" />
                                                        </Items>
                                                    </ext:RadioGroup>
                                                    <ext:RadioGroup ID="RGroup2" runat="server" GroupName="RGroup2" LabelWidth="300" FieldLabel="2.- La unidad cuenta con equipo  logístico: <br /> ( barras de sujecion y cinturones)." Cls="x-check-group-alt">
                                                        <Items>
                                                            <ext:Radio runat="server" BoxLabel="SI" InputValue="1" Checked="true" />
                                                            <ext:Radio runat="server" BoxLabel="NO" InputValue="2" />
                                                        </Items>
                                                    </ext:RadioGroup>
                                                    <ext:RadioGroup ID="RGroup3" runat="server" GroupName="RGroup3" LabelWidth="300" FieldLabel="3.- El operador coloca de nuevo el equipo logisitico <br />     al termino de su entrega" Cls="x-check-group-alt">
                                                        <Items>
                                                            <ext:Radio runat="server" BoxLabel="SI" InputValue="1" Checked="true" />
                                                            <ext:Radio runat="server" BoxLabel="NO" InputValue="2" />
                                                        </Items>
                                                    </ext:RadioGroup>
                                                    <ext:RadioGroup ID="RGroup4" runat="server" GroupName="RGroup4" LabelWidth="300" FieldLabel="4.- Documentación completa que ampara la entrega" Cls="x-check-group-alt">
                                                        <Items>
                                                            <ext:Radio runat="server" BoxLabel="SI" InputValue="1" Checked="true" />
                                                            <ext:Radio runat="server" BoxLabel="NO" InputValue="2" />
                                                        </Items>
                                                    </ext:RadioGroup>
                                                    <ext:RadioGroup ID="RGroup5" runat="server" GroupName="RGroup5" MarginSpec="0 0 5 0" LabelWidth="300" FieldLabel="5.- La unidad cuenta con ayudante" Cls="x-check-group-alt">
                                                        <Items>
                                                            <ext:Radio runat="server" BoxLabel="SI" InputValue="1" Checked="true" />
                                                            <ext:Radio runat="server" BoxLabel="NO" InputValue="2" />
                                                        </Items>
                                                    </ext:RadioGroup>
                                                </Items>
                                            </ext:FieldSet>
                                            <ext:FieldSet runat="server" Title="" Layout="AnchorLayout" Collapsible="False" Width="722" Border="false">
                                                <Items>
                                                    <ext:RadioGroup ID="RGroup6" runat="server" GroupName="RGroup6" MsgTarget="Side" LabelWidth="350"
                                                        FieldLabel="6.- Condiciones en que recibe las autopartes" AllowBlank="false" AutoFitErrors="false" Layout="ColumnLayout" AnchorHorizontal="-10"
                                                        MarginSpec="0 0 0 0">
                                                        <Items>
                                                            <ext:Container runat="server" ColumnWidth="0.255">
                                                                <Items>
                                                                    <ext:Component runat="server" Html="Excelente " Cls="x-form-check-group-label" />
                                                                    <ext:Radio runat="server" InputValue="1" Checked="true" />
                                                                </Items>
                                                            </ext:Container>

                                                            <ext:Container runat="server" ColumnWidth="0.26">
                                                                <Items>
                                                                    <ext:Component runat="server" Html="Bueno " Cls="x-form-check-group-label" />
                                                                    <ext:Radio runat="server" InputValue="2" />
                                                                </Items>
                                                            </ext:Container>
                                                            <ext:Container runat="server" ColumnWidth="0.26">
                                                                <Items>
                                                                    <ext:Component runat="server" Html="Regular" Cls="x-form-check-group-label" />
                                                                    <ext:Radio runat="server" InputValue="3" />
                                                                </Items>
                                                            </ext:Container>
                                                            <ext:Container runat="server" ColumnWidth="0.225">
                                                                <Items>
                                                                    <ext:Component runat="server" Html="Deficiente" Cls="x-form-check-group-label" />
                                                                    <ext:Radio runat="server" InputValue="4" />
                                                                </Items>
                                                            </ext:Container>
                                                        </Items>
                                                    </ext:RadioGroup>
                                                    <ext:RadioGroup ID="RGroup7" runat="server" GroupName="RGroup7" LabelWidth="350" FieldLabel="7.- La actitud del personal a su servcio fue" Cls="x-check-group-alt">
                                                        <Items>
                                                            <ext:Radio runat="server" InputValue="1" Checked="true" />
                                                            <ext:Radio runat="server" InputValue="2" />
                                                            <ext:Radio runat="server" InputValue="3" />
                                                            <ext:Radio runat="server" InputValue="4" />
                                                        </Items>
                                                    </ext:RadioGroup>
                                                    <ext:RadioGroup ID="RGroup8" runat="server" GroupName="RGroup8" MarginSpec="0 0 25 0" LabelWidth="350" FieldLabel="8.- Presentación e higiene del personal al servicio" Cls="x-check-group-alt">
                                                        <Items>
                                                            <ext:Radio runat="server" InputValue="1" Checked="true" />
                                                            <ext:Radio runat="server" InputValue="2" />
                                                            <ext:Radio runat="server" InputValue="3" />
                                                            <ext:Radio runat="server" InputValue="4" />
                                                        </Items>
                                                    </ext:RadioGroup>
                                                    <ext:TextArea ID="Txt_ObEnc" runat="server" FieldLabel="Comentarios:" />
                                                </Items>
                                            </ext:FieldSet>
                                        </Items>
                                    </ext:FieldSet>
                                </Items>
                            </ext:FormPanel>
                            <ext:Panel runat="server" ID="zTabDetSKU" Title="Detalle de Guías" Border="true" Layout="BorderLayout" StyleSpec="border: solid 2px #FF4842">
                                <Items>
                                    <ext:FieldSet runat="server" Region="North" Padding="2" MarginSpec="2 2 2 2" Layout="HBoxLayout" StyleSpec="background:transparent" Border="true">
                                        <Items>
                                            <ext:FieldSet runat="server" Layout="VBoxLayout" Padding="0" Border="True" MarginSpec="2 2 2 2">
                                                <Items>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" ID="zLbl_DetConcesionario" MarginSpec="5 5 5 5" StyleSpec="color:#166DEF;font-weight: bold;" />
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Total de Guías: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="zLbl_guias" Width="71" MarginSpec="0 10 0 1" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                            <ext:Label runat="server" Text="Paquetes: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="zLbl_item" Width="72" MarginSpec="0 10 0 1" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                            <ext:Label runat="server" Text="Tiempo de Descarga: " Cls="luma-label-CabDetTitulo" Hidden="True"></ext:Label>
                                                            <ext:Label runat="server" ID="zLbl_TiempoR" Width="100" MarginSpec="0 10 0 1" Text="-" Cls="luma-label-CabDetValor" Hidden="True"></ext:Label>
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <%-- <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Inicio Descarga: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="zLbl_Descarga" Width="170" MarginSpec="0 10 0 1" Text="-" Cls="luma-label-CabDetValor" ></ext:Label>
                                                            <ext:Label runat="server" Text="Fin Descarga: " Cls="luma-label-CabDetTitulo"></ext:Label>
                                                            <ext:Label runat="server" ID="zLbl_FinDesc" Width="170" MarginSpec="0 10 0 1" Text="-" Cls="luma-label-CabDetValor"></ext:Label>
                                                        </Items>
                                                    </ext:FieldContainer>--%>
                                                </Items>
                                            </ext:FieldSet>
                                            <ext:FieldContainer runat="server" Layout="VBoxLayout" AnchorHorizontal="100%">
                                                <Items>
                                                    <ext:Button runat="server" ID="Button2" Text="Regresar" IconCls="fa fa-arrow-left iconcolorwhite" Width="90" MarginSpec="2 2 2 2" UI="Success" Handler="Eds.gestorNavegacionTabuladores(null);" />
                                                    <ext:Button runat="server" ID="zBtnReporteExcel" Text="Reporte" IconCls="fa fa-file-excel-o iconcolorwhite" Width="90" MarginSpec="2 2 2 2" Handler="Eds.rptExportaDetGuia();" />
                                                </Items>
                                            </ext:FieldContainer>
                                        </Items>
                                    </ext:FieldSet>
                                    <ext:GridPanel ID="zGrdPnl_DetEmbArt" Header="False" runat="server" Border="true" Region="Center" AutoScroll="True">
                                        <Store>
                                            <ext:Store runat="server" ID="z_store_DetSKU" GroupField="ordenEmbarque">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ordenEmbarque" Type="String" />
                                                            <ext:ModelField Name="sku" Type="String" />
                                                            <ext:ModelField Name="descripcion" Type="String" />
                                                            <ext:ModelField Name="cantidad" Type="Int" />
                                                            <ext:ModelField Name="noCapturado" Type="Boolean" />
                                                            <ext:ModelField Name="fechaProcesada" Type="Date" />
                                                        </Fields>
                                                    </ext:Model>
                                                </Model>
                                                <Sorters>
                                                    <ext:DataSorter Property="ordenEmbarque" Direction="ASC" />
                                                </Sorters>
                                            </ext:Store>
                                        </Store>
                                        <ColumnModel ID="ColumnModel5" runat="server">
                                            <Columns>
                                                <ext:Column runat="server" ItemID="ClmGuia" Text="No. Guía" Width="85" DataIndex="ordenEmbarque" Hideable="False" />
                                                <ext:Column runat="server" Text="SKU" Width="150" DataIndex="sku" Align="Left" Hideable="False" />
                                                <ext:Column runat="server" Text="Descripcion" Width="220" DataIndex="descripcion" Hideable="false" />
                                                <ext:Column runat="server" Text="Cantidad" Width="80" DataIndex="cantidad" Hideable="False" />
                                                <ext:ImageCommandColumn runat="server" Width="30" Sortable="true" Hidden="False">
                                                    <Commands>
                                                        <ext:ImageCommand CommandName="Ubicacion" IconCls="icon-barcode">
                                                            <ToolTip Text="Captura optica/Manual" />
                                                        </ext:ImageCommand>
                                                    </Commands>
                                                    <PrepareCommand Fn="Eds.preparaComandoCapturaOptica" />
                                                </ext:ImageCommandColumn>
                                                <ext:ImageCommandColumn runat="server" Width="30" Sortable="true" Hidden="True">
                                                    <Commands>
                                                        <ext:ImageCommand CommandName="Ubicacion" IconCls="fa fa-chain-broken">
                                                            <ToolTip Text="Notas de Daño de Material" />
                                                        </ext:ImageCommand>
                                                    </Commands>
                                                    <PrepareCommand Fn="Eds.preparaComandoCapturaDanno" />
                                                </ext:ImageCommandColumn>
                                                <ext:DateColumn runat="server" Text="Fecha Captura" Width="200" DataIndex="fechaProcesada" Hideable="False" Hidden="False" Format="dd-MMM-Y H:i:s" />
                                            </Columns>
                                        </ColumnModel>
                                        <Features>
                                            <ext:Grouping ID="Grouping1" runat="server" HideGroupedHeader="true" GroupHeaderTplString='{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})' StartCollapsed="true" />
                                        </Features>
                                    </ext:GridPanel>
                                </Items>
                            </ext:Panel>
                        </Items>
                    </ext:TabPanel>
                </Items>
            </ext:TabPanel>
            <ext:Panel runat="server" ID="zFrmPnlLogin" Hidden="True">
                <LayoutConfig>
                    <ext:VBoxLayoutConfig Align="Center" Pack="Center" />
                </LayoutConfig>
                <Items>
                    <ext:Label runat="server" Text="Hola Mundo!"></ext:Label>

                    <ext:FormPanel
                        runat="server"
                        Title="Acceso al Portal"
                        Width="400"
                        Frame="true"
                        BodyPadding="13"
                        DefaultAnchor="100%">
                        <Items>
                            <ext:TextField
                                runat="server"
                                AllowBlank="false"
                                FieldLabel="Usuario"
                                Name="Usuario"
                                EmptyText="Id de Usuario" />

                            <ext:TextField
                                runat="server"
                                AllowBlank="false"
                                FieldLabel="Clave"
                                Name="pass"
                                EmptyText="Clave"
                                InputType="Password" />

                        </Items>
                        <Buttons>
                            <ext:Button runat="server" Text="Acceso">
                                <Listeners>
                                    <Click Handler="LmApp.zFrmPnlLogin.setHidden(true); LmApp.zTabPnl_Centro.setHidden(false);"></Click>
                                </Listeners>
                            </ext:Button>
                        </Buttons>
                    </ext:FormPanel>
                </Items>
            </ext:Panel>
        </Items>
    </ext:Viewport>

    <ext:Window ID="zWinAtencionClientes" runat="server" Icon="UserComment2" Title="Atención a Clientes" Hidden="true" Modal="True" Width="600" Height="400"
        BodyStyle="background-color: #FDF7FD;" Padding="6" Margin="5">
        <Content>
            <body>
                <style type="text/css">
                    body {
                        background-color: #FFFFFF;
                    }

                    .titulo1 {
                        font: normal 25px sans-serif,arial,helvetica;
                        color: #1A5079;
                        padding-left: 20px;
                        padding-right: 20px;
                        border-bottom: 4px solid gray;
                        background-color: #F2F2F2;
                    }

                    p {
                        font: normal 15px sans-serif,arial,helvetica;
                        color: #0066b4;
                    }
                </style>

                <h2 class="titulo1">&#x2709; 
                    <ext:Label ID="TituloTUM" runat="server"></ext:Label>
                </h2>
                <p>
                    <ext:Label runat="server" ID="lbl_atencionTUM1"></ext:Label>
                    <ext:Hyperlink ID="HyperLink2" runat="server" />
                </p>
                <p>
                    <ext:Label ID="lbl_atencionTUM2" runat="server"></ext:Label>
                    </br>
                        <ext:Label ID="TelTUM" runat="server"></ext:Label>
                    </br>
                        <ext:Label ID="TelTUM1" runat="server"></ext:Label>
                </p>



                <h2 class="titulo1">&#x2709; 
                    <ext:Label ID="TituloSoporte" runat="server"></ext:Label>
                </h2>
                <p>
                    <ext:Label runat="server" ID="lbl_AtencionSoporte1"></ext:Label>
                    <ext:Label ID="lbl_AtencionSoporte2" runat="server"></ext:Label>
                    <ext:Hyperlink ID="HyperLink3" runat="server" />
                </p>

            </body>
        </Content>
    </ext:Window>

    <ext:Window ID="zWinDetalle" runat="server" Icon="UserComment2" Title="Detalle Nivel de Servicio" Hidden="true" Modal="True" Width="794" Height="600"
        BodyStyle="background-color: #D5F4FB;" Padding="1" Margin="1" AutoScroll="true">
        <Content>
            <ext:GridPanel ID="zGrdPnl_DetNivSer" Layout="FitLayout" Header="False" runat="server" Border="true" Region="Center">
                <Store>
                    <ext:Store runat="server" ID="z_store_DetNivSer">
                        <Model>
                            <ext:Model runat="server">
                                <Fields>
                                    <ext:ModelField Name="secuencia" Type="Int" />
                                    <ext:ModelField Name="folio" Type="String" />
                                    <ext:ModelField Name="unidad" Type="Int" />
                                    <ext:ModelField Name="concesionario" Type="String" />
                                    <ext:ModelField Name="llegadaEstimada" Type="Date" />
                                    <ext:ModelField Name="llegadaReal" Type="Date" />
                                    <ext:ModelField Name="evalLlegada" Type="String" />
                                </Fields>
                            </ext:Model>
                        </Model>
                    </ext:Store>
                </Store>
                <ColumnModel ID="ColumnModel8" runat="server">
                    <Columns>
                        <ext:Column runat="server" Text="" ItemID="ClmSec" Width="40" DataIndex="secuencia" Align="Center" Resizable="true" />
                        <ext:Column runat="server" Text="Folio" ItemID="ClmFolio" Width="90" DataIndex="folio" Align="Center" Resizable="true" />
                        <ext:Column runat="server" Text="Unidad" ItemID="ClmUni" Width="65" DataIndex="unidad" Align="Center" Resizable="true" />
                        <ext:Column runat="server" Text="Distribuidor" ItemID="ClmConc" Width="120" DataIndex="concesionario" Align="Center" Resizable="true" />
                        <ext:DateColumn runat="server" Text="Llegada Estimada" ItemID="ClmLlegEstimada" Width="150" DataIndex="llegadaEstimada" Align="left" Format="dd-MMM-Y H:i:s" Resizable="true" />
                        <ext:DateColumn runat="server" Text="Llegada Real" ItemID="ClmLlegReal" Width="150" DataIndex="llegadaReal" Align="left" Format="dd-MMM-Y H:i:s" Resizable="true" />
                        <ext:Column runat="server" Text="Dif Tiempo" ItemID="ClmEvLLeg" Width="160" DataIndex="evalLlegada" Align="left" Resizable="true" />

                    </Columns>
                </ColumnModel>
            </ext:GridPanel>
        </Content>
    </ext:Window>
    <ext:CartesianChart runat="server"></ext:CartesianChart>

</body>
</html>

