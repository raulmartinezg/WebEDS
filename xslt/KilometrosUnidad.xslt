<?xml version="1.0" encoding="iso-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns="urn:schemas-microsoft-com:office:spreadsheet"
	xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
	xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">

  <xsl:param name="FechaDocumento" />

  <xsl:template match="/">
    <Workbook>
      <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
        <Title>Servicio de reportes TUM</Title>
        <Author>Victor Hugo Perez Cruz (TUM WEB Programmer)</Author>
        <Description>El contenido de este reporte es confidencial y propiedad del usuario que genera el reporte, por lo tanto no se considera oferta, propuesta o acuerdo sino hasta que sa confirmado en documento por escrito que contenga la firma autógrafa del apoderado legal de TUM Transportistas Unidos Mexicanos, División Norte, S.A. de C.V. Si usted no es el propietario de este documento, se le prohibe su utilización total o parcial para cualquier fin</Description>
        <LastAuthor>Luis Martín González Santiago (TUM WEB Programmer)</LastAuthor>
        <Created>{$FechaDocumento}</Created>
        <LastSaved>{$FechaDocumento}</LastSaved>
        <Category>====&gt; C O N F I D E N C I A L &lt;====</Category>
        <Manager>Sergio Valtierra</Manager>
        <Company>TUM, Transportistas Unidos Mexicanos, S.A. de C.V.</Company>
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
        <Style ss:ID="s1">
          <Borders>
            <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
            <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
            <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
            <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
          </Borders>
          <Font ss:FontName="Tahoma" x:Family="Swiss" ss:Size="8"/>
          <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
        </Style>
        <Style ss:ID="s10" ss:Parent="s1">
          <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
          <NumberFormat ss:Format="dd\-mmm\-yyyy\ hh:mm:ss" />
        </Style>
        <Style ss:ID="s63">
          <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="24" ss:Color="#000000"/>
        </Style>
        <Style ss:ID="s64">
          <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="18" ss:Color="#000000"/>
        </Style>
        <Style ss:ID="s65">
          <Alignment ss:Vertical="Bottom"/>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="24" ss:Color="#000000"/>
        </Style>
        <Style ss:ID="s67">
          <Alignment ss:Horizontal="Right" ss:Vertical="Bottom"/>
          <Interior />
          <NumberFormat ss:Format="dddd\,\ Mmmm\ dd\,\ yyyy\ \-\ hh:mm:ss\ &quot;hs&quot;" />
        </Style>
        <Style ss:ID="s69" ss:Parent="s1">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <Borders>
            <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
          </Borders>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="14" ss:Color="#FFFFFF"
           ss:Bold="1"/>
          <Interior ss:Color="#27808E" ss:Pattern="Solid"/>
        </Style>
        <Style ss:ID="s70">
          <Alignment ss:Horizontal="Right" ss:Vertical="Bottom"/>
          <Interior/>
          <NumberFormat ss:Format="[$-F800]dddd\,\ mmmm\ dd\,\ yyyy"/>
        </Style>
        <Style ss:ID="s72">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <Borders>
            <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
          </Borders>
        </Style>
        <Style ss:ID="s76" ss:Parent="s1">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <NumberFormat ss:Format="0" />
        </Style>
        <Style ss:ID="s83" ss:Parent="s1">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
        </Style>
        <Style ss:ID="s87"  ss:Parent="s1">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <Borders>
            <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
          </Borders>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#000000"
           ss:Bold="0"/>
          <Interior ss:Color="#27808E" ss:Pattern="Solid"/>
        </Style>
        <Style ss:ID="s97">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <Borders>
            <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
            <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
          </Borders>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#FFE237"
           ss:Bold="1"/>
          <Interior ss:Color="#46B7E3" ss:Pattern="Solid"/>
        </Style>


        <Style ss:ID="s187" ss:Parent="s1">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
          <Interior />
          <NumberFormat ss:Format="dd\- \ mmm\- \ yyyy\ \-\ hh:mm:ss\ &quot;hs&quot;" />
        </Style>

      </Styles>
      <xsl:apply-templates />
    </Workbook>
  </xsl:template>

  <!--variables-->

  <xsl:template match="/*">
    <xsl:variable name="NumeroFilas">
      <xsl:value-of select="count(SPQRY_EmbarquesRegistradosSIDMOVIL)" />
    </xsl:variable>

    <Worksheet ss:Name="Consulta_KilometrosPorOperador">
      <Names>
        <NamedRange ss:Name="_FilterDatabase" ss:Hidden="1" />
        <NamedRange ss:Name="Print_Titles" ss:RefersTo="SPQRY_EmbarquesRegistradosSIDMOVIL!R8" />
      </Names>
      <Table ss:ExpandedColumnCount="12"  x:FullColumns="1"
    x:FullRows="1" ss:DefaultColumnWidth="60" ss:DefaultRowHeight="15">
        <Column ss:AutoFitWidth="1" ss:Width="78"/>        
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>

        <Row ss:Height="35.5" ss:Index="1">
          <Cell ss:Index="1" ss:MergeAcross="11" ss:StyleID="s63">
            <Data ss:Type="String">Cargo EDS.</Data>
          </Cell>
        </Row>
        <Row ss:Height="35.5" ss:Index="2">
          <Cell ss:Index="1" ss:MergeAcross="11" ss:StyleID="s64">
            <Data ss:Type="String">Kilometros por Operado</Data>
          </Cell>
        </Row>
        <Row ss:AutoFitHeight="0" ss:Index="4">
          <Cell ss:Index="8" ss:MergeAcross="4" ss:StyleID="s70">
            <Data ss:Type="DateTime">
              <xsl:value-of select="$FechaDocumento" />
            </Data>
          </Cell>
        </Row>

        <!--E N C A B E Z A D O S-->

        <Row ss:Index="8" ss:AutoFitHeight="0" ss:Height="40">

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Unidad</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

      

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Oct2011</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Nov2011</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Dic2011</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Ene2012</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Feb2012</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Mar2012</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Abr2012</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">May2012</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Jun2012</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>


          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Jul2012</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Ago2012</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>

        </Row>


        <!--<xsl:for-each select="/records/record">


          --><!-- LL E N A R   D A T O S --><!--
          <Row>


            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="NumeroOperador" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>

            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Operador" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>

            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Operacion" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>

            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Oct2011" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>

            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Nov2011" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>

            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Dic2011" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>


            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Ene2012" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>

            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Feb2012" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>


            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Mar2012" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>


            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Abr2012" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>

            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="May2012" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>


            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Jun2012" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>


            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Jul2012" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>


            <Cell ss:StyleID="s76">
              <Data ss:Type="String">
                <xsl:value-of select="Ago2012" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>


          </Row>





        </xsl:for-each>-->

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
        <SplitHorizontal>8</SplitHorizontal>
        <TopRowBottomPane>10</TopRowBottomPane>
        <ActivePane>2</ActivePane>
        <Panes>
          <Pane>
            <Number>3</Number>
            <ActiveRow>13</ActiveRow>
            <ActiveCol>4</ActiveCol>
          </Pane>
          <Pane>
            <Number>2</Number>
          </Pane>
        </Panes>
        <ProtectObjects>False</ProtectObjects>
        <ProtectScenarios>False</ProtectScenarios>
      </WorksheetOptions>
      <AutoFilter x:Range="R8C1:R8C9" xmlns="urn:schemas-microsoft-com:office:excel"></AutoFilter>
    </Worksheet>
  </xsl:template>
</xsl:stylesheet>