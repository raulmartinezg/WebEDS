<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EmbarquesOperador.aspx.cs" Inherits="Cool.ASPX_EmbarquesOperador" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Embarques Realizados por Operador</title>
    <ext:XScript ID="XScript1" runat="server">        
        <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
        <script src="../Js/Obj/objExportaExcel.js" type="text/javascript"></script>
    <script src="../JS/Fn/Fn_EmbarquesOperador.js" type="text/javascript"></script>
    </ext:XScript>    
    <link href="../Css/Comun.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../CSS/Reportes.css" />
</head>
<body>
    <ext:ResourceManager ID="z_rsmEmbOpe" runat="server" Namespace="eds" DirectMethodNamespace="Cool" Theme="NeptuneTouch" Locale="es-MX">
        <Listeners>
            <DocumentReady Handler="incializaCalendariosRange(eds.z_dtnInicial,eds.z_dtnFinal);" />
        </Listeners>
    </ext:ResourceManager>

    <ext:Store ID="z_strOperador" runat="server">
        <Model>
            <ext:Model runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveOperador"></ext:ModelField>
                    <ext:ModelField Name="Nombre"></ext:ModelField>
                </Fields>
            </ext:Model>
        </Model>
        <Sorters>
            <ext:DataSorter Property="Nombre" Direction="ASC"></ext:DataSorter>
        </Sorters>
    </ext:Store>

    <ext:Store ID="z_strConsulta" runat="server">
        <Model>
            <ext:Model runat="server">
                <Fields>
                    <ext:ModelField Name="NumeroOperador" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Operador" Type="String"></ext:ModelField>
                    <ext:ModelField Name="Operacion" Type="String"></ext:ModelField>
                    <ext:ModelField Name="Oct2011" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Nov2011" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Dic2011" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Ene2012" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Feb2012" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Mar2012" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Abr2012" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="May2012" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Jun2012" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Jul2012" Type="Int"></ext:ModelField>
                    <ext:ModelField Name="Ago2012" Type="Int"></ext:ModelField>
                </Fields>
            </ext:Model>

        </Model>
        <Sorters>
            <ext:DataSorter Property="Operador" Direction="ASC"></ext:DataSorter>
            <ext:DataSorter Property="Operacion" Direction="ASC"></ext:DataSorter>
        </Sorters>
    </ext:Store>

    <ext:Viewport ID="viewport1" runat="server" Layout="Anchor">
        <Items>

            <ext:Panel ID="z_pnlControles" runat="server" Title="Embaques X Operador" Anchor="100% 0%" MinHeight="100"
                Flex="1" MarginSpec="3 3 3 3">
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
                        </Items>
                    </ext:Container>
                </Items>
            </ext:Panel>

            <ext:GridPanel ID="z_GrdPnl_Detalle" runat="server" StoreID="z_strConsulta" Anchor="100% -103" AutoScroll="true" MarginSpec="3 3 3 3">
                <TopBar>
                    <ext:Toolbar runat="server">
                        <Items>
                            <ext:ToolbarFill ID="z_tbrfill" runat="server"></ext:ToolbarFill>
                            <ext:Button ID="z_btnexportar" runat="server" Text="Exportar" Icon="PageExcel">
                                <Listeners> 
                                    <Click Handler="ExportaExcel()"></Click>
                                </Listeners>
                            </ext:Button>
                        </Items>
                    </ext:Toolbar>
                </TopBar>
                <ColumnModel runat="server">
                    <Columns>                        
                        <ext:NumberColumn runat="server" Text="N° Operador" DataIndex="NumeroOperador" Width="75" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:Column runat="server" Text="Operador" DataIndex="Operador" Width="200" Align="Left"></ext:Column>
                        <ext:Column runat="server" Text="Operación" DataIndex="Operacion" Width="120" Align="Left"></ext:Column>
                        <ext:NumberColumn runat="server" Text="Oct-2011" DataIndex="Oct2011" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Nov-2011" DataIndex="Nov2011" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Dic-2011" DataIndex="Dic2011" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Ene-2012" DataIndex="Ene2012" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Feb-2012" DataIndex="Feb2012" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Mar-2012" DataIndex="Mar2012" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Abr-2012" DataIndex="Abr2012" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="May-2012" DataIndex="May2012" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Jun-2012" DataIndex="Jun2012" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Jul-2012" DataIndex="Jul2012" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                        <ext:NumberColumn runat="server" Text="Ago-2012" DataIndex="Ago2012" Width="70" Align="Center" Format="0"></ext:NumberColumn>
                    </Columns>
                </ColumnModel>
            </ext:GridPanel>

        </Items>
    </ext:Viewport>
    <form id="form1" runat="server">
    </form>
</body>
</html>
