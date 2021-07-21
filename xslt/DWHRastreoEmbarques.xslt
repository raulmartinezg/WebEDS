<?xml version="1.0" encoding="iso-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns="urn:schemas-microsoft-com:office:spreadsheet"
	xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
	xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">
  <xsl:param name="FechaDocumento" />
  <xsl:template match="/">
    <Workbook>
      <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
        <Title>Servicio de reportes TUM</Title>
        <Author>Luis Martin Gonz�lez Santiago (TUM WEB Programmer)</Author>
        <Description>
          El contenido de este reporte es confidencial y propiedad del usuario que genera el reporte,
          por lo tanto no se considera oferta,
          propuesta o acuerdo sino hasta que sa confirmado en documento por escrito
          que contenga la firma aut�grafa del apoderado legal de TUM Transportistas Unidos Mexicanos,
          Divisi�n Norte, S.A. de C.V. Si usted no es el propietario de este documento,
          se le prohibe su utilizaci�n total o parcial para cualquier fin
        </Description>
        <LastAuthor>Luis Mart�n Gonz�lez Santiago (TUM WEB Programmer)</LastAuthor>
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
        <Style ss:ID="EstiloTitulo1">
          <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="24" ss:Color="#000000"/>
        </Style>
        <Style ss:ID="EstiloTitulo2">
          <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="18" ss:Color="#000000"/>
        </Style>
        <Style ss:ID="EstiloFechaDoc">
          <Alignment ss:Horizontal="Right" ss:Vertical="Bottom"/>
          <Interior/>
          <NumberFormat ss:Format="[$-F800]dddd\,\ mmmm\ dd\,\ yyyy"/>
        </Style>
        <Style ss:ID="EstiloCabecero1" ss:Parent="EstiloBordes">
          <Alignment ss:Horizontal="Center" ss:Vertical="Justify"  />
          <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#0734fe"
           ss:Bold="1"/>
          <Interior ss:Color="#f7d669" ss:Pattern="Solid"/>
        </Style>
        <Style ss:ID="EstiloFilas1" ss:Parent="EstiloBordes">
          <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
          <NumberFormat ss:Format="0" />
        </Style>
        <Style ss:ID="EstiloFilas2" ss:Parent="EstiloBordes">
          <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
          <NumberFormat ss:Format="0" />
        </Style>
        <Style ss:ID="EstiloFilas3" ss:Parent="EstiloBordes">
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
    <Worksheet ss:Name="Rastreo Embarques">
      <Names>
        <NamedRange ss:Name="_FilterDatabase" ss:Hidden="1" />
        <NamedRange ss:Name="Print_Titles" ss:RefersTo="records!R4" />
      </Names>
      <Table ss:ExpandedColumnCount="13"  x:FullColumns="1"
    x:FullRows="1" ss:DefaultColumnWidth="60" ss:DefaultRowHeight="15">
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="50"/>
        <Column ss:AutoFitWidth="1" ss:Width="110"/>
        <Column ss:AutoFitWidth="1" ss:Width="65"/>
        <Column ss:AutoFitWidth="1" ss:Width="160"/>
        <Column ss:AutoFitWidth="1" ss:Width="150"/>
        <Column ss:AutoFitWidth="1" ss:Width="70"/>
        <Column ss:AutoFitWidth="1" ss:Width="70"/>
        <Column ss:AutoFitWidth="1" ss:Width="120"/>
        <Column ss:AutoFitWidth="1" ss:Width="120"/>
        <Column ss:AutoFitWidth="1" ss:Width="75"/>
        <Row ss:Height="35.5" ss:Index="1">
          <Cell ss:Index="1" ss:MergeAcross="4" ss:StyleID="EstiloTitulo1">
            <Data ss:Type="String">Operaci�n NISSAN EDS</Data>
          </Cell>
        </Row>
        <Row ss:Height="35.5" ss:Index="2">
          <Cell ss:Index="1" ss:MergeAcross="4" ss:StyleID="EstiloTitulo2">
            <Data ss:Type="String">Resumen de Viajes EDS</Data>
          </Cell>
        </Row>
        <Row ss:AutoFitHeight="0" ss:Index="4">
          <Cell ss:Index="7" ss:MergeAcross="2" ss:StyleID="EstiloFechaDoc">
            <Data ss:Type="DateTime">
              <xsl:value-of select="$FechaDocumento" />
            </Data>
          </Cell>
        </Row>
        <!--E N C A B E Z A D O S-->
        <Row ss:Index="5" ss:AutoFitHeight="0" ss:Height="40">
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Placas</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Folio de Viaje</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Ruta</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Unidad</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Operador</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Destino</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Itinerario / Paradas</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
           <!-- <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Items</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Salida Programada</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>-->
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Inicio de Viaje</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Primer Servicio</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">�ltimo Servicio</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
          <Cell ss:StyleID="EstiloCabecero1">
            <Data ss:Type="String">Porciento Entrega</Data>
            <NamedCell
      ss:Name="_FilterDatabase"/>
          </Cell>
        </Row>
        <xsl:for-each select="/ds/records/record">
          <!--LL E N A R   D A T O S-->
          <Row>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="String">
                <xsl:value-of select="placas" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="String">
                <xsl:value-of select="folioViaje" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="String">
                <xsl:value-of select="ruta" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="Number">
                <xsl:value-of select="unidad" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="String">
                <xsl:value-of select="operador" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas1">
              <Data ss:Type="String">
                <xsl:value-of select="destino" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas2">
              <Data ss:Type="Number">
                <xsl:value-of select="noParadas" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
             <!-- <Cell ss:StyleID="EstiloFilas2">
              <Data ss:Type="Number">
                <xsl:value-of select="Bultos" />
              </Data>
              <NamedCell ss:Name="_FilterDatabase" />
            </Cell>
            <Cell ss:StyleID="EstiloFilas3">
			  <xsl:if test = "SalidaProgramada != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(SalidaProgramada,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>-->
           <Cell ss:StyleID="EstiloFilas3">
			  <xsl:if test = "inicioViaje != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(inicioViaje,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>	       
	        <Cell ss:StyleID="EstiloFilas3">
			  <xsl:if test = "primeraParada != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(primeraParada,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>			
	        <Cell ss:StyleID="EstiloFilas3">
			  <xsl:if test = "ultimaParada != ''" >
				<Data ss:Type="DateTime">
				  <xsl:value-of select="concat(substring(ultimaParada,1,19),'.000')" />
				</Data>
			  </xsl:if>
			  <NamedCell ss:Name="_FilterDatabase" />
			</Cell>
	        
            <Cell ss:StyleID="EstiloFilas2">
              <Data ss:Type="Number">
                <xsl:value-of select="porciento" />
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
        <SplitVertical>5</SplitVertical>
        <LeftColumnRightPane>4</LeftColumnRightPane>
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
            <ActiveRow>16</ActiveRow>
          </Pane>
        </Panes>
        <ProtectObjects>False</ProtectObjects>
        <ProtectScenarios>False</ProtectScenarios>
      </WorksheetOptions>
      <AutoFilter x:Range="R5C1:R5C11" xmlns="urn:schemas-microsoft-com:office:excel"></AutoFilter>
    </Worksheet>
  </xsl:template>
</xsl:stylesheet>