<?xml version="1.0" encoding="iso-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns="urn:schemas-microsoft-com:office:spreadsheet"
	xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
	xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">
  <xsl:param name="FechaDocumento" />
  <xsl:template match="/">
    <Workbook>
      <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
        <Title>Servicio de reportes TUM</Title>
        <Author>Luis Martin González Santiago (TUM WEB Programmer)</Author>
        <Description>El contenido de este reporte es confidencial y propiedad del usuario que genera el reporte, por lo tanto no se considera oferta, propuesta o acuerdo sino hasta que sa confirmado en documento por escrito que contenga la firma autógrafa del apoderado legal de TUM Transportistas Unidos Mexicanos, División Norte, S.A. de C.V. Si usted no es el propietario de este documento, se le prohibe su utilización total o parcial para cualquier fin</Description>
        <LastAuthor>Luis Martín González Santiago (TUM WEB Programmer)</LastAuthor>
        <Created>
          <xsl:value-of select="$FechaDocumento" />
        </Created>
        <LastSaved>
          <xsl:value-of select="$FechaDocumento" />
        </LastSaved>
        <Category>====&gt; C O N F I D E N C I A L &lt;====</Category>
        <Manager>Sergio Valtierra</Manager>
        <Company>Cargo EDS</Company>
        <Version>1.1</Version>
      </DocumentProperties>
      <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
        <WindowHeight>12210</WindowHeight>
        <WindowWidth>14940</WindowWidth>
        <WindowTopX>720</WindowTopX>
        <WindowTopY>255</WindowTopY>
        <ProtectStructure>False</ProtectStructure>
        <ProtectWindows>False</ProtectWindows>
      </ExcelWorkbook>
      <Styles>
        <Style ss:ID="Default" ss:Name="Normal">
          <Alignment ss:Vertical="Bottom"/>
          <Borders/>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
          <Interior/>
          <NumberFormat/>
          <Protection/>
        </Style>
        <Style ss:ID="EstiloBordes">
          <Borders>
            <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
            <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
            <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
            <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
          </Borders>
          <Font ss:FontName="Tahoma" x:Family="Swiss" ss:Size="8"/>
          <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
        </Style>
        <Style ss:ID="EstitoTitulo1">
          <Alignment ss:Horizontal="Left" ss:Vertical="Bottom"/>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="24" ss:Color="#000000"/>
        </Style>
        <Style ss:ID="EstitoTitulo2">
          <Alignment ss:Horizontal="Left" ss:Vertical="Bottom"/>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="18" ss:Color="#000000"/>
        </Style>
        <Style ss:ID="EstiloFechaDoc">
          <Alignment ss:Horizontal="Right" ss:Vertical="Bottom"/>
          <Interior/>
          <NumberFormat ss:Format="[$-F800]dddd\,\ mmmm\ dd\,\ yyyy"/>
        </Style>
        <Style ss:ID="EstiloFilas1" ss:Parent="EstiloBordes">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <NumberFormat ss:Format="0" />
        </Style>
        <Style ss:ID="EstiloFilas2" ss:Parent="EstiloBordes">
          <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
        </Style>
        <Style ss:ID="EstiloCabecero1">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <Borders>
            <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
          </Borders>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#0734fe"
           ss:Bold="1"/>
          <Interior ss:Color="#f7d669" ss:Pattern="Solid"/>
        </Style>
              <Style ss:ID="EstiloFilas4" ss:Parent="EstiloBordes">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <NumberFormat ss:Format="0%" />
        </Style>
      </Styles>
      <xsl:apply-templates />
    </Workbook>
  </xsl:template>
  <!--variables-->
  <xsl:template match="/*">
    <xsl:variable name="NumeroFilas">
      <xsl:value-of select="count(records)" />
    </xsl:variable>
    <Worksheet ss:Name="Rubros_Viaje">
      <Names>
        <NamedRange ss:Name="_FilterDatabase" ss:Hidden="1" />
        <NamedRange ss:Name="Print_Titles" ss:RefersTo="records!R5" />
      </Names>
      <Table ss:ExpandedColumnCount="38"  x:FullColumns="1"
    x:FullRows="1" ss:DefaultColumnWidth="60" ss:DefaultRowHeight="38">
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="200"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>

        <Row ss:Height="35" ss:Index="1">
          <Cell ss:Index="1" ss:StyleID="EstitoTitulo1">
            <Data ss:Type="String">Cargo EDS.</Data>
          </Cell>
        </Row>
        <Row ss:Height="35.5" ss:Index="2">
          <Cell ss:Index="1" ss:StyleID="EstitoTitulo2">
            <Data ss:Type="String">Comparación de Rubros de Viajes</Data>
          </Cell>
        </Row>
        <Row ss:AutoFitHeight="0" ss:Index="3">
          <Cell ss:Index="30" ss:MergeAcross="4" ss:StyleID="EstiloFechaDoc">
            <Data ss:Type="DateTime">
              <xsl:value-of select="$FechaDocumento" />
            </Data>
          </Cell>
        </Row>
        <!--E N C A B E Z A D O S  01-->
        <Row ss:Index="4" ss:Height="15">
          <Cell ss:Index="3" ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Enero</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Febrero</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Marzo</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Abril</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Mayo</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Junio</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Julio</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Agosto</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Septiembre</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Octubre</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Noviembre</Data>
          </Cell>
          <Cell ss:MergeAcross="2" ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Diciembre</Data>
          </Cell>
        </Row>
        <!--E N C A B E Z A D O S  02-->
        <Row ss:Index="5" ss:AutoFitHeight="0" ss:Height="15">
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Año</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Ruta Clasificada</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">V</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">R</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">% C</Data>
            <NamedCell ss:Name="_FilterDatabase"/>
          </Cell>
        </Row>
        <xsl:for-each select="/ds/records/record">
          <!-- LL E N A R   D A T O S -->
          <Row ss:Height="15">
            <Cell ss:StyleID="EstiloFilas2">
              <Data ss:Type="String">
                <xsl:value-of select="Anio" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas2">
              <Data ss:Type="String">
                <xsl:value-of select="RutaClasificada" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>

            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesEne" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesEne" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaEne div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesFeb" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesFeb" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaFeb div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesMar" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesMar" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaMar div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesAbr" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesAbr" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaAbr div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesMay" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesMay" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaMay div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesJun" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesJun" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaJun div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesJul" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesJul" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaJul div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesAgo" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesAgo" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaAgo div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesSep" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesSep" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaSep div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesOct div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesOct" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaOct div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesNov" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesNov" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaNov div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="ViajesDic" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="RebotesDic" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas4">
              <Data ss:Type="Number">
                <xsl:value-of select="PorcentajeCargaDic div 100" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
          </Row>
        </xsl:for-each>
      </Table>
      <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
        <PageSetup>
          <Layout x:Orientation="Landscape"/>
          <Header x:Margin="0.39370078740157483"/>
          <Footer x:Margin="0.78740157480314965"
					 x:Data="&amp;Z&amp;&quot;Arial,Negrita&quot;&amp;8Confidencial&amp;CPagina &amp;P de &amp;#&amp;D&amp;7TUM Transportistas Unidos Mexicanos"/>
          <PageMargins x:Bottom="0.98425196850393704" x:Left="0.59055118110236227"
					 x:Right="0.59055118110236227" x:Top="0.39370078740157483"/>
        </PageSetup>
        <FitToPage />
        <Print>
          <FitHeight>10</FitHeight>
          <ValidPrinterInfo />
          <Scale>71</Scale>
          <HorizontalResolution>600</HorizontalResolution>
        </Print>
        <Selected />
        <DoNotDisplayGridlines />
        <FreezePanes />
        <SplitHorizontal>5</SplitHorizontal>
        <SplitVertical>2</SplitVertical>
        <TopRowBottomPane>5</TopRowBottomPane>
        <LeftColumnRightPane>5</LeftColumnRightPane>
        <ActivePane>0</ActivePane>
        <Panes>
          <Pane>
            <Number>3</Number>
          </Pane>
          <Pane>
            <Number>1</Number>
          </Pane>
          <Pane>
            <Number>2</Number>
            <ActiveRow>10</ActiveRow>
          </Pane>
          <Pane>
            <Number>0</Number>
            <ActiveRow>0</ActiveRow>
            <ActiveCol>2</ActiveCol>
          </Pane>
        </Panes>
        <ProtectObjects>False</ProtectObjects>
        <ProtectScenarios>False</ProtectScenarios>
      </WorksheetOptions>
      <AutoFilter x:Range="R5C1:R5C38" xmlns="urn:schemas-microsoft-com:office:excel"></AutoFilter>
    </Worksheet>
  </xsl:template>
</xsl:stylesheet>