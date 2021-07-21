<%@ Page Language="C#" AutoEventWireup="true" CodeFile="KilometrosRuta.aspx.cs" Inherits="Cool.Aspx_KilometrosRuta" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Kilometros por Ruta</title>
    <ext:ResourcePlaceHolder ID="rp" runat="server">
        <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
        <script src="../Js/Obj/objExportaExcel.js" type="text/javascript"></script>
        <script src="../Js/Fn/Fn_KilometrosRuta.js" type="text/javascript"></script>
    </ext:ResourcePlaceHolder>
    <link rel="stylesheet" href="../CSS/Comun.css" />
    <link rel="stylesheet" href="../CSS/Reportes.css" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="es-MX" />
</head>
<body>
    <form id="form1" runat="server">
        <ext:ResourceManager ID="z_rsmEmbOpe" runat="server" Namespace="eds" DirectMethodNamespace="Cool" Theme="Gray">
            <Listeners>
                <DocumentReady Handler="incializaCalendariosRange(eds.z_dtnInicial,eds.z_dtnFinal);" />
            </Listeners>
        </ext:ResourceManager>
        <ext:Viewport ID="viewport1" runat="server" Layout="BorderLayout">
            <Items>
                <ext:Panel ID="z_pnlControles" runat="server" Title="Busqueda Avanzada" Region="North" Height="100" MarginSpec="3 3 3 3">
                    <Items>
                        <ext:Container ID="Container1" runat="server" Layout="HBoxLayout" MarginSpec="0 0 0">
                            <Items>
                                <ext:FieldSet ID="FieldSet1" runat="server" Title="" Height="75" Border="false" PaddingSpec="0 0 0 0">
                                    <Items>

                                        <ext:DateField ID="z_dtnInicial" runat="server" FieldLabel="Fecha Inicial" Vtype="daterange"
                                            EnableKeyEvents="true" Format="dd-MMMM-yyyy" Width="240">
                                            <CustomConfig>
                                                <ext:ConfigItem Name="endDateField" Value="z_dtnFinal" Mode="Value" />
                                            </CustomConfig>
                                            <Listeners>
                                                <KeyUp Fn="onKeyUp" />
                                            </Listeners>
                                        </ext:DateField>

                                        <ext:DateField ID="z_dtnFinal" runat="server" FieldLabel="Fecha Final" Vtype="daterange"
                                            EnableKeyEvents="true" Format="dd-MMMM-yyyy" Width="240">
                                            <CustomConfig>
                                                <ext:ConfigItem Name="startDateField" Value="z_dtnInicial" Mode="Value" />
                                            </CustomConfig>
                                            <Listeners>
                                                <KeyUp Fn="onKeyUp" />
                                            </Listeners>

                                        </ext:DateField>

                                    </Items>
                                </ext:FieldSet>
                                <ext:FieldSet ID="fieldset2" runat="server" Height="75" Layout="VBoxLayout" DefaultAnchor="100%" Border="false"
                                    MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0">
                                    <Items>
                                        <ext:Button ID="z_btnBuscar" runat="server" Text="Buscar" Width="100" IconAlign="Right" Icon="Find">
                                            <Listeners>
                                                <Click Handler="conciliaControlesDateRange(eds.z_dtnInicial,eds.z_dtnFinal);buscar();" />
                                            </Listeners>
                                        </ext:Button>
                                        <ext:Button ID="z_btnlimpiar" runat="server" Text="Reestablecer" Width="100" Icon="Reload" IconAlign="Left" PaddingSpec="5 0 0 0">
                                            <Listeners>
                                                <Click Handler="limpiar();incializaCalendariosRange(eds.z_dtnInicial,eds.z_dtnFinal);" />
                                            </Listeners>
                                        </ext:Button>
                                    </Items>
                                </ext:FieldSet>
                                <ext:FieldSet ID="fieldset3" runat="server" Height="75" Layout="VBoxLayout" DefaultAnchor="100%" Border="false"
                                    MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0">
                                    <Items>
                                        <ext:ComboBox runat="server" ID="z_cboBox_ClasificacionRuta" Width="200" ValueField="ClaveClasificacionRuta" DisplayField="Descripcion" EmptyText="Selecciona Ruta">
                                            <Store>
                                                <ext:Store ID="z_str_ClasificacionRuta" runat="server">
                                                    <Model>
                                                        <ext:Model ID="Model2" runat="server">
                                                            <Fields>
                                                                <ext:ModelField Name="ClaveClasificacionRuta" Type="Int"></ext:ModelField>
                                                                <ext:ModelField Name="Descripcion" Type="String"></ext:ModelField>
                                                            </Fields>
                                                        </ext:Model>
                                                    </Model>
                                                    <Sorters>
                                                        <ext:DataSorter Property="PrimerRutaCargada" Direction="ASC"></ext:DataSorter>
                                                    </Sorters>
                                                </ext:Store>
                                            </Store>
                                        </ext:ComboBox>
                                    </Items>
                                </ext:FieldSet>
                            </Items>
                        </ext:Container>
                    </Items>
                </ext:Panel>
                <ext:TabPanel
                    ID="TabPanel1"
                    runat="server"
                    Region="Center"
                    Margins="5 0 5 5">
                    <Items>
                                <%--<ext:Chart
                                    ID="Chart1"
                                    runat="server"
                                    Animate="true"
                                    Shadow="true"
                                    InsetPadding="60"
                                    Theme="Base:gradients"
                                    
                                    Region="Center" Frame="True" TplWriteMode="Overwrite" Stateful="True">
                                    <LegendConfig Position="Right" />
                                    <Store>
                                        <ext:Store ID="z_str_grafiaAnnio"
                                            runat="server">
                                            <Model>
                                                <ext:Model ID="Model1" runat="server">
                                                    <Fields>
                                                        <ext:ModelField Name="Year"/>
                                                        <ext:ModelField Name="Kilometros"/>
                                                    </Fields>
                                                </ext:Model>
                                            </Model>
                                        </ext:Store>
                                    </Store>
                                    <Series>
                                        <ext:PieSeries
                                            AngleField="Kilometros"
                                            ShowInLegend="true"
                                            Donut="0"
                                            Highlight="true"
                                            HighlightSegmentMargin="20">
                                            <Label Field="Year" Display="Rotate" Contrast="true" Font="18px Arial" />
                                            <Tips runat="server" TrackMouse="true" Width="140" Height="28">
                                                <Renderer Fn="tipRenderer" />
                                            </Tips>
                                        </ext:PieSeries>
                                    </Series>
                                </ext:Chart>--%>
                            
                        <ext:GridPanel ID="z_GrdPnl_Detalle" Title="Mes" runat="server" MarginSpec="3 3 3 3">
                            <TopBar>
                                <ext:Toolbar ID="Toolbar1" runat="server">
                                    <Items>
                                        <ext:ToolbarFill ID="z_tbrfill" runat="server"></ext:ToolbarFill>
                                        <ext:Button ID="z_btnexportar" runat="server" Text="Exportar" Icon="PageExcel">
                                            <Listeners>
                                                <Click Handler="ExportaExcel();"></Click>
                                            </Listeners>
                                        </ext:Button>
                                    </Items>
                                </ext:Toolbar>
                            </TopBar>
                            <Store>
                                <ext:Store ID="z_strConsulta" runat="server">
                                    <Model>
                                        <ext:Model ID="Model" runat="server">
                                            <Fields>
                                                <ext:ModelField Name="Ruta" Type="String"></ext:ModelField>
                                                <ext:ModelField Name="Year" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="1" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="2" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="3" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="4" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="5" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="6" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="7" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="8" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="9" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="10" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="11" Type="Int"></ext:ModelField>
                                                <ext:ModelField Name="12" Type="Int"></ext:ModelField>
                                            </Fields>
                                        </ext:Model>
                                    </Model>
                                    <Sorters>
                                        <ext:DataSorter Property="Year" Direction="ASC"></ext:DataSorter>
                                    </Sorters>
                                </ext:Store>

                            </Store>
                            <ColumnModel ID="ColumnModel1" runat="server">
                                <Columns>
                                    <ext:Column ID="Column1" runat="server" Text="Ruta NISSAN" DataIndex="Ruta" Width="250" Align="Left"></ext:Column>
                                    <ext:NumberColumn ID="NumberColumn13" runat="server" Text="Año" DataIndex="Year" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn1" runat="server" Text="Ene" DataIndex="1" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn2" runat="server" Text="Feb" DataIndex="2" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn3" runat="server" Text="Mar" DataIndex="3" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn4" runat="server" Text="Abr" DataIndex="4" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn5" runat="server" Text="May" DataIndex="5" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn6" runat="server" Text="Jun" DataIndex="6" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn7" runat="server" Text="Jul" DataIndex="7" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn8" runat="server" Text="Ago" DataIndex="8" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn9" runat="server" Text="Sep" DataIndex="9" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn10" runat="server" Text="Oct" DataIndex="10" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn11" runat="server" Text="Nov" DataIndex="11" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                    <ext:NumberColumn ID="NumberColumn12" runat="server" Text="Dic" DataIndex="12" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                                </Columns>
                            </ColumnModel>
                        </ext:GridPanel>
                        <ext:Panel ID="z_pnlTab_Mes" runat="server" Title="Viaje" BodyPadding="5" />

                    </Items>
                </ext:TabPanel>

            </Items>
        </ext:Viewport>
    </form>
</body>
</html>
