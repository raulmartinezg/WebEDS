<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RepGuias.aspx.cs" Inherits="Aspx.AspxRepGuias" %>


<script runat="server">
    private void z_cmbViaje_SelectedValueChanged(object sender, DirectEventArgs e)
    {
              ZdirmeRutaCiudad(e.ExtraParams["claveFolioViaje"]);
    }

</script>
<!DOCTYPE html>

<html>
<head id="Head1" runat="server">
    <title>Asignación de guias</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="es-MX" />
    <link href="../Css/Comun.css" rel="stylesheet" type="text/css" />
    <link href="../Css/DWHRastreoEmbarques.css" type="text/css" rel="Stylesheet" />
    <ext:ResourcePlaceHolder ID="rp" runat="server" Mode="ScriptFiles">
        <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
        <script src="../Js/Fn/Fn_RepGuias.js" type="text/javascript"></script>
    </ext:ResourcePlaceHolder>

    <style type="text/css">
        #unlicensed {
            width: 10px;
            height: 10px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            -moz-box-shadow: 0px 0px 10px #777;
            -webkit-box-shadow: 0px 0px 10px #777;
            box-shadow: 0px 0px 10px #777;
            background: url("") 0 0 no-repeat;
        }
    </style>
</head>
<body id="z_Body_Principal">
    <ext:ResourceManager ID="rm" runat="server" Theme="Gray" ShowWarningOnAjaxFailure="true"
        DirectMethodNamespace="Cool" Locale="es-MX" Namespace="App">
    </ext:ResourceManager>
    <ext:Store ID="z_Store_Resultado" runat="server">
        <Model>
            <ext:Model ID="Model4" runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveGuia" Type="Int" />
                    <ext:ModelField Name="Guia" Type="Int" />
                    <ext:ModelField Name="Fecha" Type="Date" />
                    <ext:ModelField Name="CV_Est_Guia" Type="Int" />
                    <ext:ModelField Name="estatus_guia" Type="String" />
                    <ext:ModelField Name="NumeroConcCte" Type="Int" />
                    <ext:ModelField Name="Rampa" Type="Int" />
                    <ext:ModelField Name="CV_Est_Packin" Type="Int" />
                    <ext:ModelField Name="estatus_packinlist" Type="String" />
                    <ext:ModelField Name="ClaveFolioViaje" Type="int" />
                    <ext:ModelField Name="FechaModificacion" Type="Date" />
                    <ext:ModelField Name="FolioViaje" Type="String" />
                    <ext:ModelField Name="Numero" Type="Int" />
                </Fields>
            </ext:Model>
        </Model>
    </ext:Store>
    <ext:Store ID="z_Store_ViajeRuta" runat="server">
        <Model>
            <ext:Model ID="Model1" runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveGuia" Type="Int" />
                    <ext:ModelField Name="Guia" Type="Int" />
                    <ext:ModelField Name="Fecha" Type="Date" />
                    <ext:ModelField Name="NumeroConcCte" Type="Int" />
                    <ext:ModelField Name="Rampa" Type="Int" />
                    <ext:ModelField Name="ClaveFolioViaje" Type="int" />
                    <ext:ModelField Name="FolioViaje" Type="String" />
                    <ext:ModelField Name="Numero" Type="Int" />
                    <ext:ModelField Name="Ruta" Type="String" />
                    <ext:ModelField Name="ClaveRuta" Type="Int" />
                    <ext:ModelField Name="ClaveCiudad" Type="Int" />
                    <ext:ModelField Name="Ciudad" Type="String" />
                    <ext:ModelField Name="Concesionario" Type="String" />
                </Fields>
            </ext:Model>
        </Model>
    </ext:Store>
    <ext:Store ID="z_store_InfoGral" runat="server">
        <Model>
            <ext:Model ID="Model3" runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveFolioViaje" Type="Int" />
                    <ext:ModelField Name="FolioViaje" Type="String" />
                    <ext:ModelField Name="ClaveOperador1" Type="Int" />
                    <ext:ModelField Name="Operador" Type="String" />
                    <ext:ModelField Name="ClaveAyudante1" Type="int" />
                    <ext:ModelField Name="ayudante" Type="String" />
                    <ext:ModelField Name="ClaveUnidad" Type="Int" />
                    <ext:ModelField Name="Unidad" Type="Int" />
                    <ext:ModelField Name="ClaveRuta" Type="Int" />
                    <ext:ModelField Name="Ruta" Type="String" />
                    <ext:ModelField Name="ClaveFormaViaje" Type="Int" />
                    <ext:ModelField Name="FormaViaje" Type="String" />
                    <ext:ModelField Name="FechaMovimiento" Type="Date" />
                </Fields>
            </ext:Model>
        </Model>
    </ext:Store>
    <ext:Store ID="z_store_RutaCiudad" runat="server">
        <Model>
            <ext:Model ID="Model5" runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveFolioViaje" Type="Int" />
                    <ext:ModelField Name="FolioViaje" Type="String" />
                    <ext:ModelField Name="ClaveRuta" Type="Int" />
                    <ext:ModelField Name="Ruta" Type="String" />
                    <ext:ModelField Name="ClaveCiudad" Type="Int" />
                    <ext:ModelField Name="Ciudad" Type="String" />
                </Fields>
            </ext:Model>
        </Model>
    </ext:Store>
    <ext:Store ID="z_store_CiudadConcesionario" runat="server">
        <Model>
            <ext:Model ID="Model6" runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveRuta" Type="Int" />
                    <ext:ModelField Name="ClaveCiudad" Type="Int" />
                    <ext:ModelField Name="NumeroConcesionario" Type="String" />
                    <ext:ModelField Name="NumeroConcCte" Type="String" />
                </Fields>
            </ext:Model>
        </Model>
    </ext:Store>

    <ext:Viewport ID="z_viewPort_Principal" runat="server" Layout="BorderLayout" MarginSpec="0 0 0 0" PaddingSpec="2 2 2 2" StyleSpec="background:black" Border="true">
        <Items>
            <ext:TabPanel runat="server" ID="z_TabPnl_RepGuias" ActiveIndex="0" StyleSpec="background-color:#990100;" AutoScroll="false" Plain="true" Region="Center">
                <Items>
                    <ext:Panel ID="Panel1" runat="server" Title="Búsqueda de Guías" Layout="BorderLayout" Icon="PageFind">
                        <Items>
                            <ext:Panel runat="server" ID="pnlBusqNorte" Region="North" Height="46" MaxHeight="150" Collapsible="True" Split="True" Header="False">
                                <TopBar>
                                    <ext:Toolbar runat="server" ID="Toolbar2" StyleSpec="background-color:white;" Height="40">
                                        <Items>
                                            <ext:DisplayField ID="DisplayField1" runat="server" Text="Guía:" StyleSpec="color:white;padding-left:10px" />
                                            <ext:TextField ID="txtfld_NumeroGuia" runat="server" Width="65" MarginSpec="0 5 0 5" />
                                            <ext:Button ID="btn_Consulta" runat="server" Text="Consultar" StyleSpec="padding-left:5px;"
                                                Icon="Find" ToolTip="Ejecutar Búsqueda" MarginSpec="0 5 0 5">
                                                <Listeners>
                                                    <Click Handler="ZUfn_CargarGuia()" />
                                                </Listeners>
                                            </ext:Button>
                                            <ext:Button ID="btn_RestConsulta" runat="server" Text="Reestablecer" StyleSpec="padding-left:5px;"
                                                Icon="Erase" ToolTip="Reestablecer criterios de búsqueda" MarginSpec="0 5 0 5">
                                                <Listeners>
                                                    <Click Handler="reinicioControlesFiltro();" />
                                                </Listeners>
                                            </ext:Button>
                                            <ext:ToolbarFill ID="ToolbarFill1" runat="server" />
                                        </Items>
                                    </ext:Toolbar>
                                </TopBar>
                            </ext:Panel>
                            <ext:GridPanel ID="z_GrdPnl_Resultado" Icon="Find"
                                runat="server" Border="true" Region="Center" Cls="x-grid-custom1" StoreID="z_Store_Resultado">
                                <ColumnModel ID="ColumnModel3" runat="server">
                                    <Columns>
                                        <ext:RowNumbererColumn ID="RowNumbererColumn1" runat="server" Width="30" />
                                        <ext:Column ID="Column20" runat="server" ItemID="ClmClaveGuia" Text="Clave Guia" Width="70" DataIndex="ClaveGuia"
                                            Resizable="true" Hidden="true" Align="Center" />
                                        <ext:Column ID="Column21" runat="server" ItemID="ClmGuia" Text="Guia" Width="80" DataIndex="Guia"
                                            Resizable="true" Align="Center" />
                                        <ext:DateColumn ID="Column22" runat="server" ItemID="ClmFecha" Text="Fecha" Width="130" DataIndex="Fecha"
                                            Resizable="true" Align="Center" Format="dd/MM/Y H:i:s" />
                                        <ext:Column ID="Column23" runat="server" ItemID="ClmCV_Est_Guia" Text="Clave Estatus Guia" Width="200" DataIndex="CV_Est_Guia"
                                            Resizable="true" Hidden="true" Align="Left" />
                                        <ext:Column ID="Column24" runat="server" ItemID="Clmestatus_guia" Text="Estatus Guia" Width="100" DataIndex="estatus_guia"
                                            Resizable="true" Align="Center" />
                                        <ext:Column ID="Column25" runat="server" ItemID="ClmNumeroConcCte" Text="Distribuidor" Width="80" DataIndex="NumeroConcCte"
                                            Resizable="true" Align="Center" />
                                        <ext:Column ID="Column26" runat="server" ItemID="ClmRampa" Text="Rampa" Width="50" DataIndex="Rampa"
                                            Align="Center" Resizable="true" />
                                        <ext:Column ID="Column27" runat="server" ItemID="ClmCV_Est_Packin" Text="Clave Estatus Packinlist" Width="45" DataIndex="CV_Est_Packin"
                                            Align="Center" Hidden="true" Resizable="true" />
                                        <ext:Column ID="Column28" runat="server" ItemID="Clmestatus_packin" Text="Estatus Packinlist" Width="125" DataIndex="estatus_packinlist"
                                            Resizable="true" Align="Center" />
                                        <ext:Column ID="Column29" runat="server" ItemID="ClmClaveFolioViaje" Text="Clave Folio Viaje" Width="100" DataIndex="ClaveFolioViaje"
                                            Resizable="true" Hidden="true" Align="Center" />
                                        <ext:DateColumn ID="Column30" runat="server" ItemID="ClmFechaModificacion" Text="Fecha Modificación" Width="130" DataIndex="FechaModificacion"
                                            Resizable="false" Align="Center" Format="dd/MM/Y H:i:s" />
                                        <ext:Column ID="Column31" runat="server" ItemID="ClmFolioViaje" Text="Folio Viaje" Width="120" DataIndex="FolioViaje"
                                            Resizable="false" Align="Center" />
                                        <ext:Column ID="Column32" runat="server" ItemID="ClmNumero" Text="Unidad" Width="51" DataIndex="Numero"
                                            Resizable="false" Align="Center" />
                                    </Columns>
                                </ColumnModel>
                                <Listeners>
                                    <CellDblClick Handler="MostrarDetalleEmbarque();"></CellDblClick>
                                </Listeners>
                            </ext:GridPanel>
                        </Items>
                    </ext:Panel>
                    <ext:Panel runat="server" ID="TabDetalles" Title="Detalle del Embarque" Icon="Bricks"
                        Border="true" Disabled="false" Layout="BorderLayout">
                        <TopBar>
                            <ext:Toolbar runat="server" ID="Toolbar3" StyleSpec="background-color:white;" Height="50">
                                <Items>
                                    <ext:Button runat="server" ID="btn_modificar" Text="Desasignar Rampa" StyleSpec="padding-left:5px;" Icon="BasketEdit"
                                        ToolTip="Cambio de Rampa" MarginSpec="0 15 0 5">
                                        <Listeners>
                                            <Click Handler="ZUfn_ModificaGuia()" />
                                        </Listeners>

                                    </ext:Button>
                                </Items>
                            </ext:Toolbar>
                        </TopBar>
                        <Items>
                            <ext:FieldSet ID="FieldSet5" runat="server" Layout="VBoxLayout" Padding="0" Border="false" Width="300" MarginSpec="15 15 0 15" Flex="1">
                                <Items>
                                     <ext:TextField ID="lbl_ClaveGuia" runat="server" Width="160" Hidden="true"  LabelWidth="70" FieldLabel="ClaveGuia" Text="-" />
                                    <ext:TextField ID="lbl_ClaveFV" runat="server" Width="160" Hidden="true"  LabelWidth="70" FieldLabel="ClaveFV" Text="-" />
                                    <ext:TextField ID="lbl_Guia" runat="server" Width="160" LabelWidth="70" FieldLabel="Guia" Text="-" />
                                    <ext:TextField ID="lbl_Dist" runat="server" Width="160" LabelWidth="70" FieldLabel="Distribuidor" Text="-" />
                                    <ext:TextField ID="lbl_Rampa" runat="server" Width="160" LabelWidth="70" FieldLabel="Rampa" Text="-" />
                                    <ext:TextField ID="lbl_Folio" runat="server" Width="160" LabelWidth="70" FieldLabel="Viaje" Text="-" />
                                    <ext:TextField ID="lbl_Unidad" runat="server" Width="160" LabelWidth="70" FieldLabel="Unidad" Text="-" />
                                </Items>
                            </ext:FieldSet>
                        </Items>
                    </ext:Panel>
                    <ext:Panel ID="Panel2" runat="Server" Title="Viaje Ruta" Layout="BorderLayout" Icon="Monitor" Hidden="true">
                        <Items>
                            <ext:Panel runat="server" ID="pnlVeriNorte" Region="North" Height="46" MaxHeight="150" Collapsible="True" Split="True" Header="False">
                                <TopBar>
                                    <ext:Toolbar runat="server" ID="Toolbar4" StyleSpec="background-color:white;" Height="40">
                                        <Items>
                                            <ext:Button runat="server" ID="btn_Consulta1" Text="Consultar" StyleSpec="padding-left:5px;"
                                                Icon="Find" ToolTip="Ejecutar Búsqueda" MarginSpec="0 5 0 5">
                                                <Listeners>
                                                    <Click Handler="ZUfn_ViajeRuta()" />
                                                </Listeners>
                                            </ext:Button>
                                        </Items>
                                    </ext:Toolbar>
                                </TopBar>
                            </ext:Panel>
                            <ext:GridPanel ID="z_GrdPnl_Verifica" runat="server" Border="true" Region="Center"
                                Cls="x-grid-custom1" StoreID="z_Store_ViajeRuta">
                                <ColumnModel ID="ColumnModel4" runat="server">
                                    <Columns>
                                        <ext:RowNumbererColumn ID="RowNumbererColumn2" runat="server" Width="30" />
                                        <ext:Column ID="Column1" runat="server" ItemID="ClaveGuia" Text="Clave Guia" Width="70" DataIndex="ClaveGuia"
                                            Resizable="true" Hidden="true" Align="Center" />
                                        <ext:Column ID="Column2" runat="server" ItemID="Guia" Text="Guia" Width="80" DataIndex="Guia"
                                            Resizable="true" Align="Center" />
                                        <ext:DateColumn ID="DateColumn1" runat="server" ItemID="Fecha" Text="Fecha" Width="130" DataIndex="Fecha"
                                            Resizable="true" Align="left" Format="dd/MM/Y H:i:s" />
                                        <ext:Column ID="Column5" runat="server" ItemID="NumeroConcCte" Text="Distribuidor" Width="80" DataIndex="NumeroConcCte"
                                            Resizable="true" Align="Center" />
                                        <ext:Column ID="Column6" runat="server" ItemID="Rampa" Text="Rampa" Width="50" DataIndex="Rampa"
                                            Align="Center" Resizable="true" />
                                        <ext:Column ID="Column9" runat="server" ItemID="ClaveFolioViaje" Text="Clave Folio Viaje" Width="100" DataIndex="ClaveFolioViaje"
                                            Resizable="true" Hidden="true" Align="Center" />
                                        <ext:Column ID="Column10" runat="server" ItemID="FolioViaje" Text="Folio Viaje" Width="120" DataIndex="FolioViaje"
                                            Resizable="false" Align="Center" />
                                        <ext:Column ID="Column11" runat="server" ItemID="Numero" Text="Unidad" Width="51" DataIndex="Numero"
                                            Resizable="false" Align="Center" />
                                        <ext:Column ID="Column12" runat="server" ItemID="Ruta" Text="Ruta" Width="240" DataIndex="Ruta"
                                            Resizable="false" Align="left" />
                                        <ext:Column ID="Column13" runat="server" ItemID="ClaveRuta" Text="ClaveRuta" Width="51" DataIndex="ClaveRuta"
                                            Resizable="false" Hidden="true" Align="Center" />
                                        <ext:Column ID="Column14" runat="server" ItemID="ClaveCiudad" Text="ClaveCiudad" Width="51" DataIndex="ClaveCiudad"
                                            Resizable="false" Hidden="true" Align="Center" />
                                        <ext:Column ID="Column3" runat="server" ItemID="Ciudad" Text="Ciudad" Width="150" DataIndex="Ciudad"
                                            Resizable="false" Align="left" />
                                        <ext:Column ID="Column4" runat="server" ItemID="Concesionario" Text="Concesionario" Width="90" DataIndex="Concesionario"
                                            Resizable="false" Align="left" />

                                    </Columns>
                                </ColumnModel>
                            </ext:GridPanel>
                        </Items>
                    </ext:Panel>
                    <ext:Panel ID="Z_ConsultaRutas" runat="Server" Title="Consulta Rutas" Layout="BorderLayout" Icon="Transmit">
                        <Items>
                            <ext:Panel runat="server" ID="pnlConsNorte" Region="North" Height="33" MaxHeight="150" Collapsible="false" Split="True" Header="False">
                                <TopBar>
                                    <ext:Toolbar runat="server" ID="Toolbar1" StyleSpec="background-color:white;" Height="30">
                                        <Items>
                                            <ext:ComboBox runat="server" ID="z_cmbViaje" LabelWidth="50" FieldLabel="" StyleSpec="font-weight:bold;" EmptyText="Seleccione un Viaje"
                                                DisplayField="FolioViaje" ValueField="ClaveFolioViaje" Editable="false" Width="155" MarginSpec="5 5 0 0">
                                                <Store>
                                                    <ext:Store ID="z_Store_Combo" runat="server">
                                                        <Model>
                                                            <ext:Model ID="Model2" runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="ClaveFolioViaje" Type="int" />
                                                                    <ext:ModelField Name="FolioViaje" Type="String" />
                                                                </Fields>
                                                            </ext:Model>
                                                        </Model>
                                                    </ext:Store>
                                                </Store>
                                                <DirectEvents>
                                                    <Select OnEvent="z_cmbViaje_SelectedValueChanged">
                                                        <ExtraParams>
                                                            <ext:Parameter Name="claveFolioViaje" Value="#{z_cmbViaje}.getValue()" Mode="Raw" />
                                                        </ExtraParams>
                                                    </Select>
                                                </DirectEvents>

                                            </ext:ComboBox>
                                            <ext:Button ID="z_reestablecer" runat="server" Text="Reestablecer" StyleSpec="padding-left:5px;"
                                                Icon="Erase" ToolTip="Reestablecer criterios de búsqueda" MarginSpec="0 5 0 5">
                                                <Listeners>
                                                    <Click Handler="ZUfn_ComboViaje();reinicioControlesFiltro('Consulta1');" />
                                                </Listeners>
                                            </ext:Button>
                                            <ext:Button ID="Actualizar" runat="server" Text="Actualizar" StyleSpec="padding-left:5px;"
                                                Icon="Reload" ToolTip="Actualizar la pagina" MarginSpec="0 5 0 5">
                                                <Listeners>
                                                    <Click Handler="ZUfn_Act_ComboViaje();" />
                                                </Listeners>
                                            </ext:Button>
                                        </Items>
                                    </ext:Toolbar>
                                </TopBar>
                            </ext:Panel>
                            <ext:Panel runat="server" ID="Panel5" Region="North" Height="100" MaxHeight="100" Collapsible="false" Header="False" Layout="HBoxLayout">
                                <Items>
                                    <ext:FieldSet ID="FieldSet2" runat="server" Padding="1" Margin="1" Border="true"
                                        Layout="AnchorLayout" StyleSpec="background-color:#CCCCCC;" Height="96">
                                        <Items>
                                            <ext:FieldContainer runat="server" ID="FieldContainer1" Layout="HBoxLayout" CombineErrors="false">
                                                <Defaults>
                                                    <ext:Parameter Name="HideLabel" Value="true" Mode="Raw" />
                                                    <ext:Parameter Name="margin" Value="5 5 0 5" Mode="Value" />
                                                </Defaults>
                                                <Items>
                                                    <ext:DisplayField runat="server" Text="Viaje:" Width="50" />
                                                    <ext:TextField runat="server" ID="lbl_NumeroViaje" Width="80" AllowBlank="false" />
                                                    <ext:DisplayField runat="server" Text="Operador:" Width="50" />
                                                    <ext:TextField runat="server" ID="lbl_Operador" Width="270" AllowBlank="false" />
                                                </Items>
                                            </ext:FieldContainer>
                                            <ext:FieldContainer runat="server" ID="FieldContainer2" Layout="HBoxLayout" CombineErrors="false">
                                                <Defaults>
                                                    <ext:Parameter Name="HideLabel" Value="true" Mode="Raw" />
                                                    <ext:Parameter Name="margin" Value="5 5 0 5" Mode="Value" />
                                                </Defaults>
                                                <Items>
                                                    <ext:DisplayField runat="server" Text="Unidad:" Width="50" />
                                                    <ext:TextField runat="server" ID="lbl_NumUnidad" Width="80" AllowBlank="false" />
                                                    <ext:DisplayField runat="server" Text="Ayudante:" Width="50" />
                                                    <ext:TextField runat="server" ID="lbl_Ayudante" Width="270" AllowBlank="false" />
                                                </Items>
                                            </ext:FieldContainer>
                                            <%--<ext:FieldContainer runat="server" Layout="HBoxLayout">
                                                <Items>
                                                    <ext:TextField ID="lbl_NumeroViaje" runat="server" Width="110" FieldLabel="Viaje:" Text="-" MarginSpec="5 5 0 0"></ext:TextField>
                                                    <ext:TextField ID="lbl_Operador" runat="server" Width="270" FieldLabel="Operador:" Text="-" MarginSpec="5 5 0 0"></ext:TextField>
                                                </Items>
                                            </ext:FieldContainer>
                                            <ext:Container runat="server" Layout="HBoxLayout">
                                                <Items>
                                                    <ext:TextField ID="lbl_NumUnidad" runat="server" Width="110" LabelWidth="35" FieldLabel="Unidad:" Text="-" MarginSpec="5 5 0 0"></ext:TextField>
                                                    <ext:TextField ID="lbl_Ayudante" runat="server" Width="270" LabelWidth="50" FieldLabel="Ayudante:" Text="-" MarginSpec="5 5 0 0"></ext:TextField>
                                                </Items>
                                            </ext:Container>--%>
                                        </Items>
                                    </ext:FieldSet>
                                    <ext:FieldSet ID="FieldSet1" runat="server" Padding="1" Margin="1" Border="true"
                                        StyleSpec="background-color:#CCCCCC;" Height="96" Flex="1">
                                        <Items>
                                            <ext:GridPanel ID="GridPanel2" runat="server" Title="" Width="380" Height="90" Region="Center"
                                                StoreID="z_store_InfoGral">
                                                <ColumnModel ID="ColumnModel5" runat="server">
                                                    <Columns>
                                                        <ext:RowNumbererColumn ID="RowNumbererColumn5" runat="server" Width="30" />
                                                        <ext:Column ID="Column7" runat="server" ItemID="Ruta2" Text="Rutas" Width="240" DataIndex="Ruta"
                                                            Resizable="false" Align="left" />
                                                        <ext:Column ID="Column8" runat="server" ItemID="FormaViaje" Text="Forma Viaje" Width="80" DataIndex="FormaViaje"
                                                            Resizable="false" Align="left" />
                                                    </Columns>
                                                </ColumnModel>
                                            </ext:GridPanel>
                                        </Items>
                                    </ext:FieldSet>
                                </Items>
                            </ext:Panel>
                            <ext:GridPanel ID="GridPanel1" runat="server" Border="true" Region="Center" Height="100"
                                Cls="x-grid-custom1" StoreID="z_store_RutaCiudad">
                                <ColumnModel ID="ColumnModel1" runat="server">
                                    <Columns>
                                        <ext:RowNumbererColumn ID="RowNumbererColumn3" runat="server" Width="30" Align="Center" />
                                        <ext:Column ID="Column15" runat="server" ItemID="ClaveFolioViaje" Text="Clave Folio Viaje" Width="70" DataIndex="ClaveFolioViaje"
                                            Resizable="true" Hidden="true" Align="left" />
                                        <ext:Column ID="Column16" runat="server" ItemID="FolioViaje" Text="Viaje" Width="100" DataIndex="FolioViaje"
                                            Resizable="true" Align="left" />
                                        <ext:Column ID="Column17" runat="server" ItemID="ClaveRuta" Text="Clave Ruta" Width="70" DataIndex="ClaveRuta"
                                            Resizable="true" Hidden="true" Align="left" />
                                        <ext:Column ID="Column18" runat="server" ItemID="Ruta" Text="Ruta" Width="280" DataIndex="Ruta"
                                            Resizable="true" Align="left" />
                                        <ext:Column ID="Column19" runat="server" ItemID="ClaveCiudad" Text="Clave Ciudad" Width="70" DataIndex="ClaveCiudad"
                                            Resizable="true" Hidden="true" Align="left" />
                                        <ext:Column ID="Column33" runat="server" ItemID="Ciudad" Text="Ciudad" Width="180" DataIndex="Ciudad"
                                            Resizable="true" Align="left">
                                            <Renderer Fn="linkRenderer" />
                                        </ext:Column>
                                    </Columns>
                                </ColumnModel>
                            </ext:GridPanel>
                        </Items>
                    </ext:Panel>
                </Items>
            </ext:TabPanel>
        </Items>
    </ext:Viewport>

</body>
</html>
