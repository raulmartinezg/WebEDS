<?xml version="1.0" encoding="iso-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns="urn:schemas-microsoft-com:office:spreadsheet"
	xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
	xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">

  <xsl:param name="FechaDocumento" />

  <xsl:template match="/">
    <Workbook>
      <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
        <Title>Servicio de reportes TUM</Title>
        <Author>Esteban Moctezuma Cabrera (TUM WEB Programmer)</Author>
        <Description>El contenido de este reporte es confidencial y propiedad del usuario que genera el reporte, por lo tanto no se considera oferta, propuesta o acuerdo sino hasta que sa confirmado en documento por escrito que contenga la firma autógrafa del apoderado legal de TUM Transportistas Unidos Mexicanos, División Norte, S.A. de C.V. Si usted no es el propietario de este documento, se le prohibe su utilización total o parcial para cualquier fin</Description>
        <Created>{$FechaDocumento}</Created>
        <LastSaved>{$FechaDocumento}</LastSaved>
        <Category>====&gt; C O N F I D E N C I A L &lt;====</Category>
        <Manager>Luis Franciscio Ruiz</Manager>
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
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#FFE237" ss:Bold="1"/>
          <Interior ss:Color="#46B7E3" ss:Pattern="Solid"/>
        </Style>
        <Style ss:ID="s187" ss:Parent="s1">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
          <Interior />
          <NumberFormat ss:Format="dd\-mmm\-yyyy\ hh:mm:ss"/>
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

    <Worksheet ss:Name="RptEntregaViaje">
      <Names>
        <NamedRange ss:Name="_FilterDatabase" ss:Hidden="1" />
        <NamedRange ss:Name="Print_Titles" ss:RefersTo="records!R5" />
      </Names>
      <Table ss:ExpandedColumnCount="13"  x:FullColumns="1"
    x:FullRows="1" ss:DefaultColumnWidth="60" ss:DefaultRowHeight="15">
        <Column ss:AutoFitWidth="1" ss:Width="75"/>        
        <Column ss:AutoFitWidth="1" ss:Width="100"/>
        <Column ss:AutoFitWidth="1" ss:Width="100"/>
        <Column ss:AutoFitWidth="1" ss:Width="55"/>
        <Column ss:AutoFitWidth="1" ss:Width="150"/>
        <Column ss:AutoFitWidth="1" ss:Width="130"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>
        <Column ss:AutoFitWidth="1" ss:Width="260"/>
        <Column ss:AutoFitWidth="1" ss:Width="100"/>
        <Column ss:AutoFitWidth="1" ss:Width="100"/>
		<Column ss:AutoFitWidth="1" ss:Width="100"/>
        <Column ss:AutoFitWidth="1" ss:Width="100"/>
        <Column ss:AutoFitWidth="1" ss:Width="80"/>

        <Row ss:Height="35.5" ss:Index="1">
          <Cell ss:Index="1" ss:MergeAcross="6" ss:StyleID="s63">
            <Data ss:Type="String">Cargo EDS.</Data>
          </Cell>
        </Row>
        <Row ss:Height="35.5" ss:Index="2">
          <Cell ss:Index="1" ss:MergeAcross="6" ss:StyleID="s64">
            <Data ss:Type="String">Eficiencia de Entrega</Data>
          </Cell>
        </Row>
        <Row ss:AutoFitHeight="0" ss:Index="4">
          <Cell ss:Index="5" ss:MergeAcross="2" ss:StyleID="s70">
            <Data ss:Type="DateTime">
              <xsl:value-of select="$FechaDocumento" />
            </Data>
          </Cell>
        </Row>

        <!--E N C A B E Z A D O S-->
        <Row ss:Index="5" ss:AutoFitHeight="0" ss:Height="40">          
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">FolioViaje</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">FechaEmbarque</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">InicioViaje</Data>
            <NamedCell   ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Unidad</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Operador</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>         
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Ruta</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">NumeroConcesionario</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">NombreConcesionario</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
		  <Cell ss:StyleID="s97">
            <Data ss:Type="String">LlegadaEstimada</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">LlegadaReal</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">SalidaEstimada</Data>
            <NamedCell   ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">SalidaReal</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="s97">
            <Data ss:Type="String">Estatus</Data>
            <NamedCell  ss:Name="_FilterDatabase"/>
          </Cell>
        </Row>


		 <xsl:for-each select="/ds/records/record"> 
		 <!-- LL E N A R   D A T O S -->
		<Row>
			<Cell ss:StyleID="s83">
              <Data ss:Type="String">
                <xsl:value-of select="FolioViaje" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
			<Cell ss:StyleID="s187">
			  <xsl:if test = "FechaEmbarque != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(FechaEmbarque,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>	
			<Cell ss:StyleID="s187">
			  <xsl:if test = "InicioViaje != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(InicioViaje,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>	
			<Cell ss:StyleID="s76">
              <Data ss:Type="Number">
                <xsl:value-of select="Unidad" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
			<Cell ss:StyleID="s83">
              <Data ss:Type="String">
                <xsl:value-of select="Operador" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
			<Cell ss:StyleID="s83">
              <Data ss:Type="String">
                <xsl:value-of select="Ruta" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
			<Cell ss:StyleID="s83">
              <Data ss:Type="String">
                <xsl:value-of select="NumeroConcesionario" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
			<Cell ss:StyleID="s83">
              <Data ss:Type="String">
                <xsl:value-of select="NombreConcesionario" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>	
			<Cell ss:StyleID="s187">
			  <xsl:if test = "LlegadaEstimada != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(LlegadaEstimada,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>	
			<Cell ss:StyleID="s187">
			  <xsl:if test = "LlegadaReal != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(LlegadaReal,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>	
			<Cell ss:StyleID="s187">
			  <xsl:if test = "SalidaEstimada != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(SalidaEstimada,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>	
			<Cell ss:StyleID="s187">
			  <xsl:if test = "SalidaReal != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(SalidaReal,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>	
			<Cell ss:StyleID="s83">
              <Data ss:Type="String">
                <xsl:value-of select="Estatus" />
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
        <TopRowBottomPane>5</TopRowBottomPane>
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
      <AutoFilter x:Range="R5C1:R5C13" xmlns="urn:schemas-microsoft-com:office:excel"></AutoFilter>
    </Worksheet>
  </xsl:template>
</xsl:stylesheet>