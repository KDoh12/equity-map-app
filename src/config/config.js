import { data } from "autoprefixer";
import chroma from "chroma-js";

const appConfig = {
  geographies: {
    fayetteCountyTracts: {
      typeOfGeography: "Census Tracts",
      label: "Fayette County Census Tracts",
      geoCodeField: "TRACTCE",
      apiEndpoints: {
        countyFIPScode: "067",
        stateFIPScode: "21",
        apiQuery: "tract:*&in=state:21&in=county:067",
      },
      geoJSONfileName: "tracts.geojson",
      mapSettings: {
        center: [38, -84.5037],
        zoom: 11,
        minZoom: 11,
        maxZoom: 18,
      },
    },
    fayetteZipcodes: {
      typeOfGeography: "ZIP Code Tabulation Areas",
      label: "Fayette County Zip Codes",
      geoCodeField: "ZCTA5CE20",
      apiEndpoints: {
        stateFIPScode: "21",
        apiQuery:
          "zip%20code%20tabulation%20area:40536,40526,40517,40516,40515,40514,40513,40511,40510,40509,40508,40507,40505,40504,40503,40502,40324,40361,40391",
      },
      geoJSONfileName: "zipcodes.geojson",
      mapSettings: {
        center: [38.1, -84.25],
        zoom: 10,
        minZoom: 9,
        maxZoom: 18,
      },
    },
    kentuckyMSAs: {
      typeOfGeography: "Metropolitan Statistical Areas",
      label: "Kentucky Metro Statistical Areas",
      geoCodeField: "GEOID",
      apiEndpoints: {
        MSAFIPScode: "30460",
        apiQuery:
          "metropolitan%20statistical%20area/micropolitan%20statistical%20area:30460,17300,23180,23190,23980,25775,31580,32460,37140,40080,21060,14540,18340,34460,36980,43700,15820,17140,19220,34660,26580,31140,33180,382107",
      },
      geoJSONfileName: "msa.geojson",
      mapSettings: {
        center: [37.7153, -85.8569],
        zoom: 7,
        minZoom: 7,
        maxZoom: 18,
      },
    },
    kentuckyCounties: {
      typeOfGeography: "Counties",
      label: "Kentucky Counties",
      geoCodeField: "COUNTYFP",
      apiEndpoints: {
        stateFIPScode: "21",
        apiQuery: "county:*&in=state:21",
      },
      geoJSONfileName: "counties.geojson",
      mapSettings: {
        center: [37.8223, -85.7682],
        zoom: 7.25,
        minZoom: 7.25,
        maxZoom: 18,
      },
    },
  },
  initialGeography: "fayetteCountyTracts",
  initialCategory: "Demographics",
  initialSubcategory: "Age and Gender",
  popupVisualizationsVariables: [
    "Total Population",
    "Median Household Income",
    "Percentage of Population with a Bachelor's Degree or Higher",
    "Percentage Without Health Insurance",
    "Median Value of Owner-Occupied Housing Units",
    "Percent Self-Employed",
  ],
  initialTimePeriod: "2022",
  colorScale: chroma
    .scale(["rgb(219, 234, 254)", "rgb(59, 130, 246)"])
    .colors(5),
};

const referenceData = {
  censusAPIUtilities: {
    "Census TIGERweb GeoServices REST API": {
      description: "Access to geographic and cartographic boundary data",
      apiReference: `https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/{layer}`,
    },
    "Census Geocoding Services": {
      description: "Provides batch and single-address geocoding services",
      apiReference: `https://geocoding.geo.census.gov/geocoder/{endpoints}`,
    },
  },
  geographiesAPISyntax: {
    // currently only serves as a reference
    States: {
      allStates: "&for=state:*",
      specificState: "&for=state:${stateFIPScode}",
    },
    Counties: {
      allCounties: "&for=county:*",
      allCountiesInState: "&for=county:*&in=state:${stateFIPScode}",
      specificCounty: "&for=county:${countyFIPScode}&in=state:${stateFIPScode}",
    },
    "Metropolitan Statistical Areas": {
      allMSAs:
        "&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:*",
      specificMSA:
        "&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:${MSAFIPScode}",
    },
    "Congressional Districts": "&for=congressional%20district:*",
    Places: "&for=place:*",
    "Census Tracts": {
      allTracts: "&for=tract:*",
      allTractsInCounty:
        "&for=tract:*&in=state:${stateFIPScode}&in=county:${countyFIPScode}",
      specificTract:
        "&for=tract:${tractFIPScode}&in=state:${stateFIPScode}&in=county:${countyFIPScode}",
    },
    "Block Groups": "&for=block%20group:*",
    Blocks: "&for=block:*",
    "Cities and Towns": "&for=place:*",
    "ZIP Code Tabulation Areas": "&for=zip%20code%20tabulation%20area:*",
    Regions: "&for=region:*",
  },
  categories: {
    "Entrepreneurship (Total Population)": {
      data: {
        subcategories: {
          "Business Ownership": {
            "Percent of Workers Self-Employed in Own Incorporated Business": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: [
                "B24080_005E", // Estimate!!Total!!Male!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
              ],
              transformationType: "percentage",
              baseCode: ["B24080_001E"], // SEX BY CLASS OF WORKER FOR THE CIVILIAN EMPLOYED POPULATION 16 YEARS AND OVER
              baseLabel: "Total Employed Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Percent of Workers Self-Employed in Own Not-Incorporated Business":
              {
                dataset: {
                  availableIn: ["acs5", "acs1"],
                  displayedDataset: "acs/acs5",
                },
                variableCode: [
                  "B24080_010E", // Estimate!!Total!!Male!!Self-employed in own not incorporated business workers
                  "B24080_020E", // Estimate!!Total!!Female!!Self-employed in own not incorporated business workers
                ],
                transformationType: "percentage",
                baseCode: ["B24080_001E"], // SEX BY CLASS OF WORKER FOR THE CIVILIAN EMPLOYED POPULATION 16 YEARS AND OVER
                baseLabel: "Total Employed Population",
                format: "percentage",
                classificationMethod: "quantiles",
              },
            "Percent of All Self-Employed Workers Who Are Women": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: [
                "B24080_020E", // Estimate!!Total!!Female!!Self-employed in own not incorporated business workers
                "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
              ],
              transformationType: "percentage",
              baseCode: [
                "B24080_005E", // Estimate!!Total!!Male!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                "B24080_010E", // Estimate!!Total!!Male!!Self-employed in own not incorporated business workers
                "B24080_020E", // Estimate!!Total!!Female!!Self-employed in own not incorporated business workers
              ],
              baseLabel: "Total Employed Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Percent of Self-Employed Women Who Have Incorporated Their Business":
              {
                dataset: {
                  availableIn: ["acs5", "acs1"],
                  displayedDataset: "acs/acs5",
                },
                variableCode: [
                  "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                ],
                transformationType: "percentage",
                baseCode: [
                  "B24080_020E", // Estimate!!Total!!Female!!Self-employed in own not incorporated business workers
                  "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                ],
                baseLabel: "Total Employed Population",
                format: "percentage",
                classificationMethod: "quantiles",
              },
            // "Total Businesses Surveyed": {
            //   dataset: {
            //     availableIn: ["abscs"],
            //     displayedDataset: "abscs",
            //   },
            //   variableCode: ["FIRMPDEMP"],
            //   format: "none",
            //   description:
            //     "This includes all businesses that responded to the survey. If any one person owned 10% or more of the business, the respondent provided details about the sex, ethnicity, race, and veteran status for up to four of the largest owners.",
            //   classificationMethod: "naturalBreaks",
            // },
            // "Female-Owned Businesses": {
            //   dataset: {
            //     availableIn: ["abscs"],
            //     displayedDataset: "abscs",
            //   },
            //   variableCode: ["FIRMPDEMP"],
            //   transformationType: "none",
            //   format: "none",
            //   classificationMethod: "naturalBreaks",
            // },
            // "Female-Owned Businesses": {
            //   dataset: {
            //     availableIn: ["abscs"],
            //     displayedDataset: "abscs",
            //   },
            //   variableCode: ["FIRMPDEMP"],
            //   transformationType: "none",
            //   format: "none",
            //   classificationMethod: "naturalBreaks",
            // },
            // "Veteran-Owned Businesses": {
            //   dataset: {
            //     availableIn: ["abscs"],
            //     displayedDataset: "abscs",
            //   },
            //   variableCode: ["FIRMPDEMP"],
            //   transformationType: "none",
            //   format: "none",
            //   classificationMethod: "naturalBreaks",
            // },
            // "Minority-Owned Businesses": {
            //   dataset: {
            //     availableIn: ["abscs"],
            //     displayedDataset: "abscs",
            //   },
            //   variableCode: ["FIRMPDEMP"],
            //   transformationType: "none",
            //   format: "none",
            //   classificationMethod: "naturalBreaks",
            // },
          },
          "Economic Development Indicators": {
            "Employment Rate": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B23025_004E"],
              transformationType: "percentage",
              baseCode: ["B23025_002E"],
              baseLabel: "Labor Force",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          "Economic Data (BDS)": {
            "Job Creation and Destruction": {
              dataset: { availableIn: ["bds"], displayedDataset: "bds" },
              variableCode: ["JOB_CREATION", "JOB_DESTRUCTION"],
              transformationType: "none",
              format: "number",
              classificationMethod: "naturalBreaks",
            },
            "Firm Births and Deaths": {
              dataset: { availableIn: ["bds"], displayedDataset: "bds" },
              variableCode: ["FIRM_BIRTHS", "FIRM_DEATHS"],
              transformationType: "none",
              format: "number",
              classificationMethod: "naturalBreaks",
            },
            "Establishment Characteristics": {
              dataset: { availableIn: ["bds"], displayedDataset: "bds" },
              variableCode: ["ESTABLISHMENT_SIZE"],
              transformationType: "none",
              format: "number",
              classificationMethod: "naturalBreaks",
            },
          },
          "County Business Patterns": {
            "Number of Establishments": {
              dataset: { availableIn: ["cbp"], displayedDataset: "cbp" },
              variableCode: ["ESTAB"],
              transformationType: "none",
              format: "number",
              classificationMethod: "naturalBreaks",
            },
            "Employment Size": {
              dataset: { availableIn: ["cbp"], displayedDataset: "cbp" },
              variableCode: ["EMP_SIZE"],
              transformationType: "none",
              format: "number",
              classificationMethod: "naturalBreaks",
            },
            Payroll: {
              dataset: { availableIn: ["cbp"], displayedDataset: "cbp" },
              variableCode: ["PAY"],
              transformationType: "none",
              format: "currency",
              classificationMethod: "naturalBreaks",
            },
          },
          "Post-Secondary Employment Outcomes (PSEO)": {
            "Earnings by Degree Level": {
              dataset: { availableIn: ["pseo"], displayedDataset: "pseo" },
              variableCode: ["EARNINGS"],
              transformationType: "none",
              format: "currency",
              classificationMethod: "naturalBreaks",
            },
            "Employment Outcomes by Institution and Major": {
              dataset: { availableIn: ["pseo"], displayedDataset: "pseo" },
              variableCode: ["EMPLOYMENT"],
              transformationType: "none",
              format: "number",
              classificationMethod: "naturalBreaks",
            },
          },
          "Survey of Income and Program Participation (SIPP)": {
            Income: {
              dataset: { availableIn: ["sipp"], displayedDataset: "sipp" },
              variableCode: ["INCOME"],
              transformationType: "none",
              format: "currency",
              classificationMethod: "naturalBreaks",
            },
            "Program Participation": {
              dataset: { availableIn: ["sipp"], displayedDataset: "sipp" },
              variableCode: ["PROGRAM_PARTICIPATION"],
              transformationType: "none",
              format: "number",
              classificationMethod: "naturalBreaks",
            },
            Employment: {
              dataset: { availableIn: ["sipp"], displayedDataset: "sipp" },
              variableCode: ["EMPLOYMENT"],
              transformationType: "none",
              format: "number",
              classificationMethod: "naturalBreaks",
            },
          },
        },
      },
      narrativeElements: {
        subtitle:
          "Sheds Light on Economic Activities and Opportunities, with a Focus on Minorities, Women, and Veterans.",
        overview:
          "Characteristics of Business Owners and Businesses, Focusing on Minorities, Women, and Veterans.",
        questions: [
          "What are the characteristics of businesses owned by minorities, women, and veterans?",
          "How does business size and sector distribution vary among different owner demographics?",
        ],
        keyInsights:
          "Significant findings, trends, and disparities within the data.",
        impact:
          "Real-world implications of these insights on minorities, women, and veterans.",
        tags: [
          "entrepreneurship",
          "business ownership demographics",
          "sector analysis",
          "minority-owned businesses",
        ],
      },
    },
    "Demographics (Total Population)": {
      data: {
        subcategories: {
          "Age and Gender": {
            "Female Population": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B01001_026E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Male Population": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B01001_002E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Total Population": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B01001_001E"],
              format: "none",
              classificationMethod: "equalInterval",
            },
          },
          "Race and Ethnicity": {
            "Black or African American Alone": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B02001_003E"],
              transformationType: "percentage",
              baseCode: ["B02001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Hispanic or Latino": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B03001_003E"],
              transformationType: "percentage",
              baseCode: ["B03001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "White Alone": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B02001_002E"],
              transformationType: "percentage",
              baseCode: ["B02001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          "Household Types": {
            "Family Households": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B11001_002E"],
              transformationType: "percentage",
              baseCode: ["B11001_001E"],
              baseLabel: "Total Households",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Non-family Households": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B11001_007E"],
              transformationType: "percentage",
              baseCode: ["B11001_001E"],
              baseLabel: "Total Households",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          "Language Spoken At Home": {
            "English Only": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["C16001_002E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Other Languages": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["C16001_004E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            Spanish: {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["C16001_003E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          // "Veterans Status": {
          //   "Total Veterans": {
          //     dataset: {
          //       availableIn: ["acs5", "acs1"],
          //       displayedDataset: "acs/acs5",
          //     },
          //     variableCode: ["B21001_002E"],
          //     transformationType: "ratePerThousand",
          //     baseCode: ["B21001_001E"],
          //     baseLabel: "Total Civilian population 18 years and over",
          //     format: "ratePerThousand",
          //     classificationMethod: "quantiles",
          //   },
          // },
        },
      },
      narrativeElements: {
        subtitle:
          "A Foundational Category for Understanding Socio-Economic and Demographic Dynamics.",
        overview:
          "Demographics provide a snapshot of the population's composition and characteristics. Understanding the demographic makeup of a community is essential for policymakers, businesses, and researchers to make informed decisions and address the needs of diverse populations.",
        questions: [
          "How does the age distribution vary across different communities?",
          "What are the correlations between demographic compositions and socio-economic factors like income and education levels?",
        ],
        keyInsights:
          "Highlight significant findings, trends, and disparities within the data.",
        impact:
          "Discuss the real-world implications of these insights on minorities, women, and veterans.",
        tags: [
          "demographics",
          "socio-economic factors",
          "age distribution",
          "gender composition",
        ],
      },
    },
    "Income & Employment (Total Population)": {
      data: {
        subcategories: {
          Income: {
            "Median Household Income (in 2018 inflation-adjusted dollars)": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B19013_001E"],
              format: "currency",
              classificationMethod: "quantiles", // a better classification method might be needed such as quantiles
            },
            "Per Capita Income": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B19301_001E"],
              format: "currency",
              classificationMethod: "quantiles",
            },
          },
          Poverty: {
            "Households Receiving Food Stamps/SNAP": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B22010_002E"],
              transformationType: "percentage",
              baseCode: ["B11001_001E"],
              baseLabel: "Total Households",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Individuals Below Poverty Level": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B17001_002E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          Employment: {
            "Labor Force Participation": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B23001_001E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "equalInterval",
            },
            "Unemployment Rate": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B23025_005E"],
              transformationType: "percentage",
              baseCode: ["B23025_002E"],
              baseLabel: "Labor Force",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          "Industry and Occupation": {
            "Management, Business, Science, and Arts Occupations": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["C24010_003E", "C24010_039E"], // Male and Female codes combined
              transformationType: "summedPercentage",
              baseCode: ["C24010_001E"], // Total Labor Force Population
              baseLabel: "Labor Force Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Natural Resources, Construction, and Maintenance Occupations": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["C24010_030E", "C24010_066E"], // Male and Female codes combined
              transformationType: "summedPercentage",
              baseCode: ["C24010_001E"], // Total Labor Force Population
              baseLabel: "Labor Force Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Production, Transportation, and Material Moving Occupations": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["C24010_034E", "C24010_070E"], // Male and Female codes combined
              transformationType: "summedPercentage",
              baseCode: ["C24010_001E"], // Total Labor Force Population
              baseLabel: "Labor Force Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Sales and Office Occupations": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["C24010_027E", "C24010_063E"], // Male and Female codes combined
              transformationType: "summedPercentage",
              baseCode: ["C24010_001E"], // Total Labor Force Population
              baseLabel: "Labor Force Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Service Occupations": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["C24010_019E", "C24010_055E"], // Male and Female codes combined
              transformationType: "summedPercentage",
              baseCode: ["C24010_001E"], // Total Labor Force Population
              baseLabel: "Labor Force Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
        },
      },
      narrativeElements: {
        subtitle: "Central to Equality and Economic Opportunity Discussions.",
        overview:
          "An analysis of income levels, sources, employment rates, and their relationship with other socio-economic factors.",
        questions: [
          "Which areas show the most significant disparities in income distribution?",
          "How does employment status affect poverty levels in different communities?",
        ],
        keyInsights:
          "Highlight significant findings, trends, and disparities within the data.",
        impact:
          "Discuss the real-world implications of these insights on policy and individual communities.",
        tags: ["income distribution", "employment rates", "poverty levels"],
      },
    },
    "Education (Total Population)": {
      data: {
        subcategories: {
          "Educational Attainment": {
            "Less Than High School": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: [
                "B15003_002E",
                "B15003_003E",
                "B15003_004E",
                "B15003_005E",
                "B15003_006E",
                "B15003_007E",
                "B15003_008E",
                "B15003_009E",
                "B15003_010E",
                "B15003_011E",
                "B15003_012E",
                "B15003_013E",
                "B15003_014E",
                "B15003_015E",
                "B15003_016E",
              ],
              transformationType: "summedPercentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "High School Graduate": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B15003_017E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Bachelor's or Higher": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: [
                "B15003_022E",
                "B15003_023E",
                "B15003_024E",
                "B15003_025E",
              ],
              transformationType: "summedPercentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          "School Enrollment": {
            "Nursery to Grade 4": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B14001_003E", "B14001_004E", "B14001_005E"],
              transformationType: "summedPercentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Grades 5 to 12": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B14001_006E", "B14001_007E", "B14001_008E"],
              transformationType: "summedPercentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "College or Graduate School": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B14001_009E", "B14001_010E"],
              transformationType: "summedPercentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
        },
      },
      narrativeElements: {
        subtitle: "Critical for Long-term Socio-economic Mobility.",
        overview:
          "Insights into educational attainment levels, disparities, and impacts on income and employment.",
        questions: [
          "How does educational attainment affect income levels in different demographics?",
          "What is the impact of education on employment opportunities?",
        ],
        keyInsights:
          "Significant findings, trends, and disparities within the data.",
        impact:
          "Real-world implications of these insights on minorities, women, and veterans.",
        tags: [
          "educational attainment",
          "income disparities by education",
          "educational programs impact",
        ],
      },
    },
    "Housing & Infrastructure (Total Population)": {
      data: {
        subcategories: {
          "Ownership and Rent": {
            "Owner-Occupied Units": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B25003_002E"],
              transformationType: "percentage",
              baseCode: ["B25003_001E"],
              baseLabel: "Total Housing Units",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Renter-Occupied Units": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B25003_003E"],
              transformationType: "percentage",
              baseCode: ["B25003_001E"],
              baseLabel: "Total Housing Units",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          "Housing Affordability and Costs": {
            "Median Value of Owner-Occupied Housing Units": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B25077_001E"],
              format: "currency",
              classificationMethod: "quantiles",
            },
            "Median Gross Rent": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B25064_001E"],
              format: "currency",
              classificationMethod: "quantiles",
            },
          },
          "Commuting Patterns": {
            "Workers Who Commute by Car, Truck, or Van": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B08006_002E"],
              transformationType: "percentage",
              baseCode: ["B08006_001E"],
              baseLabel: "Total Workers Commuting",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Public Transportation (excluding taxicab)": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B08006_008E"],
              transformationType: "percentage",
              baseCode: ["B08006_001E"],
              baseLabel: "Total Workers Commuting",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
        },
      },
      narrativeElements: {
        subtitle: "Reflects Living Standards and Access to Resources.",
        overview:
          "Examination of housing affordability, quality, and access to essential services.",
        questions: [
          "What percentage of income do different demographics spend on housing?",
          "How does access to essential services like healthcare and education vary across communities?",
        ],
        keyInsights:
          "Significant findings, trends, and disparities within the data.",
        impact:
          "Real-world implications of these insights on minorities, women, and veterans.",
        tags: [
          "housing affordability",
          "infrastructure quality",
          "access to services",
        ],
      },
    },
    "Public Health (Total Population)": {
      data: {
        subcategories: {
          "Insurance Coverage": {
            "Health Insurance Coverage Among the General Population (% insured) ":
              {
                dataset: {
                  availableIn: ["acs5", "acs1"],
                  displayedDataset: "acs/acs5",
                },
                variableCode: [
                  "B27001_004E", // "Estimate!!Total!!Male!!Under 6 years!!With health insurance coverage"
                  "B27001_007E", // "Estimate!!Total!!Male!!6 to 18 years!!With health insurance coverage"
                  "B27001_010E", // "Estimate!!Total!!Male!!19 to 25 years!!With health insurance coverage"
                  "B27001_013E", // Estimate!!Total!!Male!!26 to 34 years!!With health insurance coverage
                  "B27001_016E", // Estimate!!Total!!Male!!35 to 44 years!!With health insurance coverage
                  "B27001_019E", // Estimate!!Total!!Male!!45 to 54 years!!With health insurance coverage
                  "B27001_022E", // Estimate!!Total!!Male!!55 to 64 years!!With health insurance coverage
                  "B27001_025E", // Estimate!!Total!!Male!!65 to 74 years!!With health insurance coverage
                  "B27001_028E", // Estimate!!Total!!Male!!75 years and over!!With health insurance coverage
                  "B27001_031E", // Estimate!!Total!!Female!!Under 6 years!!With health insurance coverage
                  "B27001_034E", // Estimate!!Total!!Female!!6 to 18 years!!With health insurance coverage
                  "B27001_037E", // Estimate!!Total!!Female!!19 to 25 years!!With health insurance coverage
                  "B27001_040E", // Estimate!!Total!!Female!!26 to 34 years!!With health insurance coverage
                  "B27001_043E", // Estimate!!Total!!Female!!35 to 44 years!!With health insurance coverage
                  "B27001_046E", // Estimate!!Total!!Female!!45 to 54 years!!With health insurance coverage
                  "B27001_049E", // Estimate!!Total!!Female!!55 to 64 years!!With health insurance coverage
                  "B27001_052E", // Estimate!!Total!!Female!!65 to 74 years!!With health insurance coverage
                  "B27001_055E", // Estimate!!Total!!Female!!75 years and over!!With health insurance coverage
                ],
                transformationType: "percentage",
                baseCode: ["B27001_001E"], // Total Population in table 'universe' --> https://api.census.gov/data/2018/acs/acs1/groups/B27001.html
                baseLabel: "Total Population",
                format: "percentage",
                classificationMethod: "quantiles",
              },
            // "Without Health Insurance": {
            //   dataset: {
            //     availableIn: ["acs5", "acs1"],
            //     displayedDataset: "acs/acs5",
            //   },
            //   variableCode: ["B27001_005E"],
            //   transformationType: "percentage",
            //   baseCode: ["B01001_001E"],
            //   baseLabel: "Total Population",
            //   format: "percentage",
            //   classificationMethod: "equalInterval",
            // },
            "Health Insurance Coverage Among Minorities (% insured)": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5/subject",
              },
              // Total: B27001_001E - Total White: B27001H_001E = Total Minority Population
              // Percent of Minorities with health insurance = (Total Population with health insurance - 'White Alone, Not Hispanic or Latino' population with health insurance) / Total Population) * 100
              variableCode: [
                // "S2701_C03_016E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!White alone
                "S2701_C03_017E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Black or African American alone
                "S2701_C03_018E", // 	Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!American Indian and Alaska Native alone
                "S2701_C03_019E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Asian alone
                "S2701_C03_020E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Native Hawaiian and Other Pacific Islander alone
                "S2701_C03_021E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Some Other Race Alone
                "S2701_C03_022E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Two or More Races
                "S2701_C03_023E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Hispanic or Latino Origin
                // "S2701_C03_024E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!! RACE AND HISPANIC OR LATINO ORIGIN!!White alone, Not Hispanic or Latino

                // //White Alone
                // // "B27001A_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // // "B27001A_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // // "B27001A_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // // "B27001A_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // // "B27001A_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // // "B27001A_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // // "B27001A_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // // "B27001A_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // // "B27001A_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // //Black or African American Alone
                // "B27001B_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001B_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001B_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001B_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001B_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001B_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001B_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001B_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001B_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // //American Indian and Alaska Native Alone
                // "B27001C_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001C_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001C_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001C_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001C_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001C_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001C_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001C_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001C_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // //Asian Alone
                // "B27001D_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001D_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001D_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001D_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001D_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001D_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001D_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001D_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001D_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // //Native Hawaiian and Other Pacific Islander Alone
                // "B27001E_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001E_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001E_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001E_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001E_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001E_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001E_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001E_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001E_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // // Some Other Race Alone
                // "B27001F_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001F_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001F_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001F_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001F_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001F_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001F_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001F_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001F_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // // Two or More Races
                // "B27001G_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001G_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001G_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001G_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001G_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001G_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001G_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001G_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001G_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // // White Alone, Not Hispanic or Latino
                // // "B27001H_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // // "B27001H_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // // "B27001H_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // // "B27001H_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // // "B27001H_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // // "B27001H_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // // "B27001H_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // // "B27001H_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // // "B27001H_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // // Hispanic or Latino
                // "B27001I_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001I_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001I_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001I_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001I_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001I_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001I_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001I_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001I_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage
              ],
              // Transformation will need to involve a new transformation to determine the average of the percentages among the different minority groups
              transformationType: "averageOfPrecalculations",
              baseCode: [
                // Total Population in table 'universe' https://api.census.gov/data/2022/acs/acs1/groups/B27001.html
                // "B27001_001E", // Total Population
                // "B27001A_001E", // Total White Alone
                // "B27001B_001E", // Total Black or African American Alone
                // "B27001C_001E", // Total American Indian and Alaska Native Alone
                // "B27001D_001E", // Total Asian Alone
                // "B27001E_001E", // Total Native Hawaiian and Other Pacific Islander Alone
                // "B27001F_001E", // Total Some Other Race Alone
                // "B27001G_001E", // Total Two or More Races
                // // "B27001H_001E", // Total White Alone, Not Hispanic or Latino
                // "B27001I_001E", // Total Hispanic or Latino
              ],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Health Insurance Coverage Among Women (% insured)": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5/subject", // '/subject' is necessary for the 'S' variables (subject tables)
              },
              variableCode: [
                "S2701_C03_015E", //Estimate!!Percent Insured!!Civilian noninstitutionalized population!!SEX!!Female
              ],
              transformationType: "precalculation",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            // "Health Insurance Coverage Among Veterans": {
            // },
          },
          Disability: {
            "With a Disability": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: ["B18101_004E"],
              transformationType: "percentage",
              baseCode: ["B01001_001E"],
              baseLabel: "Total Civilian Non-institutionalized Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
        },
      },
      narrativeElements: {
        subtitle: "Highlights Disparities in Health Access and Outcomes.",
        overview:
          "Information on health disparities, access to healthcare, and correlations with socio-economic conditions.",
        questions: [
          "Which communities face the most significant challenges in accessing healthcare?",
          "How do health outcomes correlate with income and education levels?",
        ],
        keyInsights:
          "Significant findings, trends, and disparities within the data.",
        impact:
          "Real-world implications of these insights on minorities, women, and veterans.",
        tags: [
          "public health",
          "health insurance coverage",
          "health facilities distribution",
        ],
      },
    },
    Minorities: {
      data: {
        subcategories: {
          Demographics: {
            "Minorities as a Percent of the Total Population": {
              dataset: { availableIn: ["acs5"], displayedDataset: "acs/acs5" },
              variableCode: ["B02001_002E"], // White Alone
              transformationType: "percentageDifference",
              baseCode: ["B02001_001E"], // Total Population
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          "Public Health": {
            "Health Insurance Coverage Among Minorities (% insured)": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5/subject",
              },
              // Total: B27001_001E - Total White: B27001H_001E = Total Minority Population
              // Percent of Minorities with health insurance = (Total Population with health insurance - 'White Alone, Not Hispanic or Latino' population with health insurance) / Total Population) * 100
              variableCode: [
                // "S2701_C03_016E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!White alone
                "S2701_C03_017E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Black or African American alone
                "S2701_C03_018E", // 	Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!American Indian and Alaska Native alone
                "S2701_C03_019E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Asian alone
                "S2701_C03_020E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Native Hawaiian and Other Pacific Islander alone
                "S2701_C03_021E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Some Other Race Alone
                "S2701_C03_022E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Two or More Races
                "S2701_C03_023E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!!RACE AND HISPANIC OR LATINO ORIGIN!!Hispanic or Latino Origin
                // "S2701_C03_024E", // Estimate!!Percent Insured!!Civilian noninstitutionalized population!! RACE AND HISPANIC OR LATINO ORIGIN!!White alone, Not Hispanic or Latino

                // //White Alone
                // // "B27001A_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // // "B27001A_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // // "B27001A_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // // "B27001A_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // // "B27001A_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // // "B27001A_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // // "B27001A_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // // "B27001A_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // // "B27001A_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // //Black or African American Alone
                // "B27001B_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001B_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001B_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001B_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001B_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001B_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001B_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001B_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001B_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // //American Indian and Alaska Native Alone
                // "B27001C_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001C_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001C_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001C_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001C_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001C_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001C_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001C_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001C_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // //Asian Alone
                // "B27001D_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001D_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001D_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001D_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001D_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001D_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001D_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001D_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001D_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // //Native Hawaiian and Other Pacific Islander Alone
                // "B27001E_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001E_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001E_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001E_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001E_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001E_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001E_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001E_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001E_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // // Some Other Race Alone
                // "B27001F_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001F_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001F_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001F_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001F_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001F_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001F_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001F_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001F_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // // Two or More Races
                // "B27001G_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001G_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001G_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001G_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001G_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001G_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001G_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001G_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001G_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // // White Alone, Not Hispanic or Latino
                // // "B27001H_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // // "B27001H_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // // "B27001H_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // // "B27001H_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // // "B27001H_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // // "B27001H_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // // "B27001H_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // // "B27001H_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // // "B27001H_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage

                // // Hispanic or Latino
                // "B27001I_003E", // Estimate!!Total:!!Under 6 years:!!With health insurance coverage
                // "B27001I_006E", // Estimate!!Total:!!6 to 18 years:!!With health insurance coverage
                // "B27001I_009E", // Estimate!!Total:!!19 to 25 years:!!With health insurance coverage
                // "B27001I_012E", // Estimate!!Total:!!26 to 34 years:!!With health insurance coverage
                // "B27001I_015E", // Estimate!!Total:!!35 to 44 years:!!With health insurance coverage
                // "B27001I_018E", // Estimate!!Total:!!45 to 54 years:!!With health insurance coverage
                // "B27001I_021E", // Estimate!!Total:!!55 to 64 years:!!With health insurance coverage
                // "B27001I_024E", // Estimate!!Total:!!65 to 74 years:!!With health insurance coverage
                // "B27001I_027E", // Estimate!!Total:!!75 years and over:!!With health insurance coverage
              ],
              // Transformation will need to involve a new transformation to determine the average of the percentages among the different minority groups
              transformationType: "averageOfPrecalculations",
              baseCode: [
                // Total Population in table 'universe' https://api.census.gov/data/2022/acs/acs1/groups/B27001.html
                // "B27001_001E", // Total Population
                // "B27001A_001E", // Total White Alone
                // "B27001B_001E", // Total Black or African American Alone
                // "B27001C_001E", // Total American Indian and Alaska Native Alone
                // "B27001D_001E", // Total Asian Alone
                // "B27001E_001E", // Total Native Hawaiian and Other Pacific Islander Alone
                // "B27001F_001E", // Total Some Other Race Alone
                // "B27001G_001E", // Total Two or More Races
                // // "B27001H_001E", // Total White Alone, Not Hispanic or Latino
                // "B27001I_001E", // Total Hispanic or Latino
              ],
              baseLabel: "Total Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
        },
      },
      narrativeElements: {
        subtitle:
          "Insights into the Socio-Economic Dynamics of Minority Communities",
        overview:
          "Minorities are a vital part of the American population, contributing to the nation's cultural, social, and economic diversity. Understanding the unique challenges and opportunities faced by minority communities is essential for promoting equality, diversity, and inclusion.",
        questions: [
          "What are the main socio-economic challenges faced by minority communities?",
          "How do demographic factors influence the economic well-being of minority populations?",
          "What strategies can be implemented to address disparities and promote economic growth in minority communities?",
        ],
        keyInsights:
          "Highlight significant trends, disparities, and growth patterns within minority communities.",
        impact:
          "Discuss the real-world implications of these insights on policy-making, resource allocation, and community development, particularly for minorities and underrepresented groups.",
        tags: [
          "minorities",
          "socio-economic dynamics",
          "diversity",
          "inclusion",
          "equality",
        ],
      },
    },
    Veterans: {
      data: {
        subcategories: {
          Demographics: {
            "Percent of Veterans in the Civilian Population": {
              dataset: { availableIn: ["acs5"], displayedDataset: "acs/acs5" },
              variableCode: ["B21001_002E"],
              transformationType: "percentage",
              baseCode: ["B21001_001E"],
              baseLabel: "Total Civilian Population 18 and Over",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Percent of Female Civilian Population Who are Veterans": {
              dataset: { availableIn: ["acs5"], displayedDataset: "acs/acs5" },
              variableCode: ["B21001_023E"],
              transformationType: "percentage",
              baseCode: ["B21001_022E"],
              baseLabel: "Total Female Civilian Population 18 and Over",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Percent of Male Civilian Population Who are Veterans": {
              dataset: { availableIn: ["acs5"], displayedDataset: "acs/acs5" },
              variableCode: ["B21001_005E"],
              transformationType: "percentage",
              baseCode: ["B21001_004E"],
              baseLabel: "Total Male Civilian Population 18 and Over",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          Employment: {
            "Percent of Veterans 18 to 64 Who Are Employed": {
              dataset: { availableIn: ["acs5"], displayedDataset: "acs/acs5" },
              variableCode: ["B21005_005E", "B21005_016E", "B21005_027E"],
              transformationType: "summedPercentage",
              baseCode: ["B21005_003E", "B21005_014E", "B21005_025E"],
              baseLabel: "Veteran Population 18 to 64 Years",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          Income: {
            "Median Income for Veterans": {
              dataset: { availableIn: ["acs5"], displayedDataset: "acs/acs5" },
              variableCode: ["B21004_002E"],
              transformationType: "none",
              format: "currency",
              classificationMethod: "quantiles",
            },
          },
        },
      },
      narrativeElements: {
        subtitle:
          "Insights into the Economic and Social Well-being of Veterans.",
        overview:
          "Veterans are a unique and important segment of the population, having served their country with honor and distinction. Understanding the economic and social well-being of veterans is essential for providing them with the support and resources they need to thrive in civilian life.",
        questions: [
          "What are the main challenges faced by veterans in transitioning to civilian life?",
          "How do demographic factors influence the economic and social well-being of veterans?",
          "What strategies can be implemented to support veterans and improve their quality of life?",
        ],
        keyInsights:
          "Highlight significant trends, disparities, and opportunities within the veteran population.",
        impact:
          "Discuss the real-world implications of these insights on policy-making, resource allocation, and community support for veterans.",
        tags: [
          "veterans",
          "economic well-being",
          "social well-being",
          "transition to civilian life",
          "support services",
        ],
      },
    },
    Women: {
      data: {
        subcategories: {
          Education: {
            "Percent of Women 25 and Over with a Bachelors Degree or Higher": {
              dataset: { availableIn: ["acs5"], displayedDataset: "acs/acs5" },
              variableCode: [
                "B15002_032E",
                "B15002_033E",
                "B15002_034E",
                "B15002_035E",
              ],
              transformationType: "summedPercentage",
              baseCode: ["B15002_019E"],
              baseLabel: "Total Female Population 25 and Over",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          Employment: {
            "Percent of Women 16 and Over Employed In the Labor Force": {
              dataset: { availableIn: ["acs5"], displayedDataset: "acs/acs5" },
              variableCode: [
                "B23001_093E",
                "B23001_100E",
                "B23001_107E",
                "B23001_114E",
                "B23001_121E",
                "B23001_128E",
                "B23001_135E",
                "B23001_142E",
                "B23001_149E",
                "B23001_156E",
                "B23001_161E",
                "B23001_166E",
                "B23001_171E",
              ],
              transformationType: "summedPercentage",
              baseCode: [
                "B23001_090E",
                "B23001_097E",
                "B23001_104E",
                "B23001_111E",
                "B23001_118E",
                "B23001_125E",
                "B23001_132E",
                "B23001_139E",
                "B23001_146E",
                "B23001_153E",
                "B23001_160E",
                "B23001_165E",
                "B23001_170E",
              ],
              baseLabel:
                "Women in the civilian labor force age 16 years and over",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
          Entrepreneurship: {
            "Percent of Total Businesses Owned by Women": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002",
              baseFilter: ["&NAICS2017=00&SEX=001"],
              classificationMethod: "equalInterval",
            },
            "Percent of Self-Employed Women Who Have Incorporated Their Business":
              {
                dataset: {
                  availableIn: ["acs5", "acs1"],
                  displayedDataset: "acs/acs5",
                },
                variableCode: [
                  "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                ],
                transformationType: "percentage",
                baseCode: [
                  "B24080_020E", // Estimate!!Total!!Female!!Self-employed in own not incorporated business workers
                  "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                ],
                baseLabel: "Total Employed Population",
                format: "percentage",
                classificationMethod: "quantiles",
              },
            "Percent of All Self-Employed Workers Who Are Women": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5",
              },
              variableCode: [
                "B24080_020E", // Estimate!!Total!!Female!!Self-employed in own not incorporated business workers
                "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
              ],
              transformationType: "percentage",
              baseCode: [
                "B24080_005E", // Estimate!!Total!!Male!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                "B24080_015E", // 	Estimate!!Total!!Female!!Private for-profit wage and salary workers!!Self-employed in own incorporated business workers
                "B24080_010E", // Estimate!!Total!!Male!!Self-employed in own not incorporated business workers
                "B24080_020E", // Estimate!!Total!!Female!!Self-employed in own not incorporated business workers
              ],
              baseLabel: "Total Employed Population",
              format: "percentage",
              classificationMethod: "quantiles",
            },
            "Employment Size": {
              // FIX ME
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["EMP"],
              transformationType: "none",
              format: "number",
              filter: "&SEX=002",
              baseFilter: ["&SEX=001"],
              classificationMethod: "quantiles",
            },
            "Women-Owned Businesses with sales/receipts of less than $5,000": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002&RCPSZFI=511",
              baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
              classificationMethod: "equalInterval",
            },
            "Women-Owned Businesses with sales/receipts of $5,000 to $9,999": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002&RCPSZFI=518",
              baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
              classificationMethod: "equalInterval",
            },
            "Women-Owned Businesses with sales/receipts of $10,000 to $24,999":
              {
                dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
                variableCode: ["FIRMPDEMP"],
                transformationType: "percentage",
                format: "percentage",
                filter: "&NAICS2017=00&SEX=002&RCPSZFI=519",
                baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
                classificationMethod: "equalInterval",
              },
            "Women-Owned Businesses with sales/receipts of $25,000 to $49,999":
              {
                dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
                variableCode: ["FIRMPDEMP"],
                transformationType: "percentage",
                format: "percentage",
                filter: "&NAICS2017=00&SEX=002&RCPSZFI=521",
                baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
                classificationMethod: "equalInterval",
              },
            "Women-Owned Businesses with sales/receipts of $50,000 to $99,999":
              {
                dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
                variableCode: ["FIRMPDEMP"],
                transformationType: "percentage",
                format: "percentage",
                filter: "&NAICS2017=00&SEX=002&RCPSZFI=522",
                baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
                classificationMethod: "equalInterval",
              },
            "Women-Owned Businesses with sales/receipts of $100,000 to $249,999":
              {
                dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
                variableCode: ["FIRMPDEMP"],
                transformationType: "percentage",
                format: "percentage",
                filter: "&NAICS2017=00&SEX=002&RCPSZFI=523",
                baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
                classificationMethod: "equalInterval",
              },
            "Women-Owned Businesses with sales/receipts of $250,000 to $499,999":
              {
                dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
                variableCode: ["FIRMPDEMP"],
                transformationType: "percentage",
                format: "percentage",
                filter: "&NAICS2017=00&SEX=002&RCPSZFI=525",
                baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
                classificationMethod: "equalInterval",
              },
            "Women-Owned Businesses with sales/receipts of $500,000 to $999,999":
              {
                dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
                variableCode: ["FIRMPDEMP"],
                transformationType: "percentage",
                format: "percentage",
                filter: "&NAICS2017=00&SEX=002&RCPSZFI=531",
                baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
                classificationMethod: "equalInterval",
              },
            "Women-Owned Businesses with sales/receipts of $1,000,000 or more":
              {
                dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
                variableCode: ["FIRMPDEMP"],
                transformationType: "percentage",
                format: "percentage",
                filter: "&NAICS2017=00&SEX=002&RCPSZFI=532",
                baseFilter: ["&NAICS2017=00&SEX=002&RCPSZFI=001"],
                classificationMethod: "equalInterval",
              },
            "Women Owned Businesses with less than 2 years in business": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002&YIBSZFI=311",
              baseFilter: ["&NAICS2017=00&SEX=002&YIBSZFI=001"],
              classificationMethod: "equalInterval",
            },
            "Women Owned Businesses with 2 to 3 years in business": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002&YIBSZFI=318",
              baseFilter: ["&NAICS2017=00&SEX=002&YIBSZFI=001"],
              classificationMethod: "equalInterval",
            },
            "Women Owned Businesses with 4 to 5 years in business": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002&YIBSZFI=319",
              baseFilter: ["&NAICS2017=00&SEX=002&YIBSZFI=001"],
              classificationMethod: "equalInterval",
            },
            "Women Owned Businesses with 6 to 10 years in business": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002&YIBSZFI=321",
              baseFilter: ["&NAICS2017=00&SEX=002&YIBSZFI=001"],
              classificationMethod: "equalInterval",
            },
            "Women Owned Businesses with 11 to 15 years in business": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002&YIBSZFI=322",
              baseFilter: ["&NAICS2017=00&SEX=002&YIBSZFI=001"],
              classificationMethod: "equalInterval",
            },
            "Women Owned Businesses with 16 or more years in business": {
              dataset: { availableIn: ["abscs"], displayedDataset: "abscs" },
              variableCode: ["FIRMPDEMP"],
              transformationType: "percentage",
              format: "percentage",
              filter: "&NAICS2017=00&SEX=002&YIBSZFI=321",
              baseFilter: ["&NAICS2017=00&SEX=002&YIBSZFI=323"],
              classificationMethod: "quantiles",
            },
          },
          "Public Health": {
            "Health Insurance Coverage Among Women (% insured)": {
              dataset: {
                availableIn: ["acs5", "acs1"],
                displayedDataset: "acs/acs5/subject", // '/subject' is necessary for the 'S' variables (subject tables)
              },
              variableCode: [
                "S2701_C03_015E", //Estimate!!Percent Insured!!Civilian noninstitutionalized population!!SEX!!Female
              ],
              transformationType: "precalculation",
              format: "percentage",
              classificationMethod: "quantiles",
            },
          },
        },
      },
      narrativeElements: {
        subtitle: "Insights into the Economic and Social Empowerment of",
        overview:
          "Women play a critical role in society, contributing to the economy, culture, and social fabric of communities. Understanding the economic and social empowerment of women is essential to promoting a more equitable and inclusive society.",
        questions: [
          "What are the main challenges and opportunities?",
          "How do demographic factors influence the economic and social empowerment",
          "What strategies can be implemented?",
        ],
        keyInsights:
          "Highlight significant trends, disparities, and opportunities within the",
        impact:
          "Discuss the real-world implications of these insights on policy-making, resource allocation, and community support.",
        tags: [
          "Trends",
          "Disparities",
          "Opportunities",
          "Empowerment",
          "Equality",
          "Inclusion",
        ],
      },
    },
    // "Community Economic Development": {
    //   data: {

    //       },
    //   narrativeElements: {
    //     subtitle:
    //       "Key Insights into the Economic Growth and Sustainability of Communities.",
    //     overview:
    //       "Community Economic Development focuses on understanding and improving the economic health and sustainability of communities. This includes analyzing business ownership, employment, and economic indicators to identify areas of growth and opportunities for development.",
    //     questions: [
    //       "What are the main drivers of economic growth in different communities?",
    //       "How do demographic factors influence economic development and business ownership?",
    //       "What strategies can be implemented to foster sustainable economic development in underserved communities?",
    //     ],
    //     keyInsights:
    //       "Highlight significant trends, growth patterns, and economic disparities within various communities.",
    //     impact:
    //       "Discuss the real-world implications of these insights on policy-making, resource allocation, and community planning, particularly for minorities, women, and veterans.",
    //     tags: [
    //       "economic growth",
    //       "community development",
    //       "business ownership",
    //       "employment",
    //       "economic indicators",
    //       "sustainability",
    //     ],
    //   },
    // },
  },
  censusDataAPIs: {
    abscs: {
      description: "Annual Business Survey data on business ownership",
      datasetName: "Annual Business Survey",
      yearsAvailable: [[2012, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/abscs?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: ["States", "Metropolitan Statistical Areas"],
      source: "https://www.census.gov/programs-surveys/abs.html",
    },
    abscbo: {
      description:
        "rovides data for owners of respondent employer firms by sector, sex, ethnicity, race, and veteran status for the U.S., states, and metro areas, including detailed owner characteristics. Data for counties and economic places are also available for 2018.",
      datasetName:
        "Annual Business Survey - Characteristics of Business Owners",
      yearsAvailable: [[2018, 2022]],
      apiReference:
        "https://api.census.gov/data/{year}/abscbo?get=VARIABLE&for=GEOGRAPHY&{filters}",
      geographiesAvailable: ["States", "Metropolitan Statistical Areas"],
      source: "https://www.census.gov/data/developers/data-sets/abs.html",
    },
    "acs/acs5": {
      description:
        "Detailed demographic, social, economic, and housing statistics (5-year estimates)",
      datasetName: "American Community Survey 5-Year Data",
      yearsAvailable: [[2005, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/acs/acs5?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Counties",
        "Metropolitan Statistical Areas",
        "Congressional Districts",
        "ZIP Code Tabulation Areas",
        "Places",
        "Census Tracts",
        "Block Groups",
      ],
      source: "https://www.census.gov/programs-surveys/acs",
    },
    "acs/acs5/subject": {
      description:
        "Detailed demographic, social, economic, and housing statistics (5-year estimates)",
      datasetName: "American Community Survey 5-Year Data",
      yearsAvailable: [[2005, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/acs/acs5/subject?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Counties",
        "Metropolitan Statistical Areas",
        "Congressional Districts",
        "ZIP Code Tabulation Areas",
        "Places",
        "Census Tracts",
        "Block Groups",
      ],
      source: "https://www.census.gov/programs-surveys/acs",
    },
    "acs/acs1": {
      description:
        "Detailed demographic, social, economic, and housing statistics (1-year estimates)",
      datasetName: "American Community Survey 1-Year Data",
      yearsAvailable: [[2010, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/acs/acs1?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Counties",
        "Metropolitan Statistical Areas",
        "ZIP Code Tabulation Areas",
        "Congressional Districts",
        "Places",
        "Census Tracts",
      ],
      source: "https://www.census.gov/programs-surveys/acs",
    },
    dec: {
      description: "Basic demographic information, conducted every 10 years",
      datasetName: "Decennial Census",
      yearsAvailable: [
        1790, 1800, 1810, 1820, 1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900,
        1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020,
      ],
      apiReference:
        "https://api.census.gov/data/{year}/dec?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Counties",
        "Places",
        "Census Tracts",
        "Block Groups",
        "Blocks",
      ],
      source: "https://www.census.gov/programs-surveys/decennial-census.html",
    },
    pep: {
      description:
        "Updated population estimates for the nation, states, counties, cities, and towns",
      datasetName: "Population Estimates Program",
      yearsAvailable: [[1990, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/pep/population?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Counties",
        "Metropolitan Statistical Areas",
        "Cities and Towns",
      ],
      source: "https://www.census.gov/programs-surveys/popest.html",
    },
    cps: {
      description:
        "Labor force statistics, including employment, unemployment, and earnings",
      datasetName: "Current Population Survey",
      yearsAvailable: [[1940, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/cps/basic?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: ["Nation"],
      source: "https://www.census.gov/programs-surveys/cps.html",
    },
    econ: {
      description:
        "Detailed economic data by industry and geography, conducted every 5 years",
      datasetName: "Economic Census",
      yearsAvailable: [
        1967, 1972, 1977, 1982, 1987, 1992, 1997, 2002, 2007, 2012, 2017, 2022,
      ],
      apiReference:
        "https://api.census.gov/data/{year}/econ?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Counties",
        "Places",
        "Metropolitan Statistical Areas",
      ],
      source: "https://www.census.gov/programs-surveys/economic-census.html",
    },
    sbo: {
      description:
        "Economic data by race, ethnicity, gender, and veteran status of business owners",
      datasetName: "Survey of Business Owners",
      yearsAvailable: [
        1972, 1977, 1982, 1987, 1992, 1997, 2002, 2007, 2012, 2017,
      ],
      apiReference:
        "https://api.census.gov/data/{year}/sbo?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Metropolitan Statistical Areas",
      ],
      source: "https://www.census.gov/programs-surveys/sbo.html",
    },
    bds: {
      description:
        "Measures of business dynamics, such as job creation and destruction",
      datasetName: "Business Dynamics Statistics",
      yearsAvailable: [[1977, 2023]],
      apiReference:
        "https://api.census.gov/data/timeseries/bds/firms?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Metropolitan Statistical Areas",
        "Counties",
      ],
      source: "https://www.census.gov/programs-surveys/bds.html",
    },
    cbp: {
      description:
        "Annual subnational economic data by industry, including ZIP Code level",
      datasetName: "County Business Patterns",
      yearsAvailable: [[1964, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/cbp?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Counties",
        "Metropolitan Statistical Areas",
        "ZIP Code Tabulation Areas",
      ],
      source: "https://www.census.gov/programs-surveys/cbp.html",
    },
    hvs: {
      description:
        "Quarterly data on rental and homeowner vacancy rates, and homeownership rates",
      datasetName: "Housing Vacancies and Homeownership",
      yearsAvailable: [[1956, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/hvs?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "Regions",
        "States",
        "Metropolitan Statistical Areas",
      ],
      source: "https://www.census.gov/housing/hvs/index.html",
    },
    ase: {
      description:
        "Timely updates on women, minority, and veteran-owned businesses",
      datasetName: "Annual Survey of Entrepreneurs",
      yearsAvailable: [2014, 2015, 2016],
      apiReference:
        "https://api.census.gov/data/{year}/ase?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Metropolitan Statistical Areas",
      ],
      source: "https://www.census.gov/programs-surveys/ase.html",
    },
    sipp: {
      description:
        "Detailed information on the economic situation of U.S. households",
      datasetName: "Survey of Income and Program Participation",
      yearsAvailable: [[1984, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/sipp?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: ["Nation", "States"],
      source: "https://www.census.gov/programs-surveys/sipp.html",
    },
    "timeseries/healthins/sahie": {
      description: "State and county health insurance statistics",
      datasetName: "Small Area Health Insurance Estimates",
      yearsAvailable: [[2006, 2023]],
      apiReference:
        "https://api.census.gov/data/timeseries/healthins/sahie?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: ["Nation", "States", "Counties"],
      source: "https://www.census.gov/programs-surveys/sahie.html",
    },
    pseo: {
      description:
        "Earnings and employment outcomes for graduates of specific colleges",
      datasetName: "Post-Secondary Employment Outcomes",
      yearsAvailable: [[2018, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/pseo?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: [
        "Nation",
        "States",
        "Metropolitan Statistical Areas",
      ],
      source: "https://lehd.ces.census.gov/data/pseo_experimental.html",
    },
    ncvs: {
      description:
        "Annual victimization data, including crime trends and victim characteristics",
      datasetName: "National Crime Victimization Survey",
      yearsAvailable: [[1993, 2023]],
      apiReference:
        "https://api.census.gov/data/{year}/ncvs?get=VARIABLE&for=GEOGRAPHY",
      geographiesAvailable: ["Nation"],
      source: "https://www.bjs.gov/index.cfm?ty=dcdetail&iid=245",
    },
  },
  annotationValues: {
    "-666666666": {
      annotation: "-",
      meaning:
        "The estimate could not be computed due to insufficient number of sample observations or one or both of the median estimates falls in the lowest/highest interval of an open-ended distribution. For a 5-year median estimate, the margin of error associated with a median was larger than the median itself.",
    },
    "-999999999": {
      annotation: "N",
      meaning:
        "The estimate or margin of error cannot be displayed due to insufficient number of sample cases in the selected geographic area.",
    },
    "-888888888": {
      annotation: "(X)",
      meaning:
        "The estimate or margin of error is not applicable or not available.",
    },
    VariesMedianLow: {
      annotation: "median-",
      meaning:
        "The median falls in the lowest interval of an open-ended distribution.",
    },
    VariesMedianHigh: {
      annotation: "median+",
      meaning:
        "The median falls in the highest interval of an open-ended distribution.",
    },
    "-222222222": {
      annotation: "**",
      meaning:
        "The margin of error could not be computed due to insufficient number of sample observations.",
    },
    "-333333333": {
      annotation: "***",
      meaning:
        "The margin of error could not be computed because the median falls in the lowest or highest interval of an open-ended distribution.",
    },
    "-555555555": {
      annotation: "*****",
      meaning:
        "A margin of error is not appropriate because the estimate is controlled to an independent estimate. The margin of error may be treated as zero.",
    },
    "*": {
      annotation: "N/A",
      meaning:
        "An * indicates that the estimate is significantly different than the estimate from the most current year. A 'c' indicates that both the estimate for that year and the current year are controlled; a statistical test is not appropriate.",
    },
    null: {
      annotation: "null",
      meaning:
        "A null value in the estimate means there is no data available for the requested geography.",
    },
    D: {
      annotation: "D",
      meaning:
        "Withheld to avoid disclosing data for individual companies; data are included in higher level totals.",
    },
    S: {
      annotation: "S",
      meaning:
        "Estimate does not meet publication standards because of high sampling variability, poor response quality, or other concerns about the estimate quality. Unpublished estimates derived from this table by subtraction are subject to these same limitations and should not be attributed to the U.S. Census Bureau.",
    },
    N: {
      annotation: "N",
      meaning: "Not available or not comparable",
    },
    X: {
      annotation: "X",
      meaning: "Not applicable",
    },
  },
  featuredStudies: [
    {
      title: "Impact of Education on Income",
      subtitle:
        "Analyzing how different levels of education affect income, particularly for minorities and women.",
      defaultMappedVariable: {
        label: "Median Household Income by Education Level",
        code: "Custom_Code_EdIncome",
      },
      studyObjective:
        "To analyze how different levels of education affect income, with a focus on disparities impacting minorities and women.",
      methodology:
        "Utilizing cross-sectional data from national databases, this study employs regression analysis to explore the relationship between educational attainment and median household income, while controlling for variables such as race, gender, and geographic location.",
      findings: [
        "Higher education levels correlate with significantly higher income levels.",
        "The income gap between different education levels is more pronounced for minority groups and women.",
      ],
      implications:
        "The study underscores the critical role of educational attainment in economic advancement and highlights the need for policies that address educational inequalities to reduce income disparities.",
      visualization: [
        // "infographics": "Summarizes key statistics on the income-education relationship, highlighting disparities.",
        // "interactiveCharts": "Allows users to explore income data by education level, race, and gender.",
        // "maps": "Geographical patterns showing regions with high disparities in education-income correlation."
        {
          title: "Income by Educational Level",
          description:
            "A line graph plots median household income against educational levels, revealing income disparities.",
          type: "Line Graph",
          chartJS: true,
          data: {
            labels: [
              "Less Than High School",
              "High School Graduate",
              "Some College",
              "Bachelor's Degree or Higher",
            ],
            datasets: [
              {
                label: "Median Household Income",
                data: [30000, 35000, 40000, 50000],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          },
          VisualizationComponent: "Line",
          options: {},
        },
      ],
      questions: [
        "How do income levels vary by educational attainment?",
        "What are the income disparities between different education levels, especially for minorities and women?",
      ],
      overview:
        "This study examines the correlation between education and income, with a focus on the disparities that affect minorities and women.",
      keyInsights:
        "The study finds significant income disparities across different education levels, with the gap widening for minority groups and women.",
      impact:
        "The findings highlight the importance of educational attainment in achieving economic equity and suggest the need for targeted educational policies.",
      tags: [
        "education",
        "income",
        "disparities",
        "minorities",
        "women",
        "line graph",
      ],
    },
    {
      title: "Veteran Entrepreneurship",
      subtitle:
        "Characteristics and challenges of businesses owned by veterans.",
      defaultMappedVariable: {
        label: "Number of Veteran-Owned Businesses",
        code: "Custom_Code_VetBiz",
      },
      studyObjective:
        "To explore the characteristics and challenges of businesses owned by veterans, focusing on success factors and barriers.",
      methodology:
        "Analysis of survey data from veteran business owners across the country, complemented by case studies and interviews.",
      findings: [
        "Veteran-owned businesses show resilience but face unique challenges in access to capital and networks.",
        "A significant number of veteran entrepreneurs benefit from specific mentoring programs.",
      ],
      implications:
        "Findings suggest the need for targeted support structures for veteran-owned businesses, including improved access to finance and mentoring networks.",
      visualization: [
        // "infographics": "Highlights characteristics of veteran-owned businesses and their economic impact.",
        // "interactiveCharts": "Examines success rates, challenges, and support mechanisms for veteran entrepreneurs.",
        // "maps": "Shows the distribution and impact of veteran-owned businesses across regions."
        {
          title: "Demographic Breakdown of Business Ownership",
          description:
            "Stacked bar charts display business ownership proportions among different demographic groups, including veterans.",
          type: "Stacked Bar Chart",
          chartJS: true,
          data: {
            labels: ["Veterans", "Non-Veterans"],
            datasets: [
              {
                label: "Number of Businesses",
                data: [1200, 4800],
                backgroundColor: [
                  "rgba(255, 159, 64, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                ],
              },
            ],
          },
          VisualizationComponent: "Bar",
          options: {
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          },
        },
      ],
      questions: [
        "What are the unique challenges faced by veteran-owned businesses?",
        "How do veteran-owned businesses compare to non-veteran-owned businesses in terms of number and sector?",
      ],
      overview:
        "Exploring the characteristics and challenges faced by businesses owned by veterans to identify success factors and barriers.",
      keyInsights:
        "Veteran-owned businesses demonstrate resilience but encounter specific challenges, notably in accessing capital and networking opportunities.",
      impact:
        "The study suggests the need for enhanced support and resources for veteran entrepreneurs, aiming to leverage their unique skills and contributions to the economy.",
      tags: [
        "veteran entrepreneurship",
        "business ownership",
        "challenges",
        "stacked bar chart",
      ],
    },
    {
      title: "Health Disparities by Demographic",
      subtitle:
        "How health outcomes vary among different demographic groups and locations.",
      defaultMappedVariable: {
        label: "Health Insurance Coverage Rate",
        code: "Custom_Code_HealthCov",
      },
      studyObjective:
        "Investigate how health outcomes vary among different demographic groups and locations, with a focus on access to healthcare.",
      methodology:
        "This study combines health data from national surveys with demographic information, using statistical analysis to identify disparities.",
      findings: [
        "Significant health disparities exist across racial, gender, and socioeconomic lines.",
        "Access to healthcare significantly affects health outcomes, with marginalized communities being the most impacted.",
      ],
      implications:
        "The research calls for targeted health policies to address disparities and improve access to healthcare for all demographic groups.",
      visualization: [
        // "infographics": "Visual summary of health disparities and the factors influencing them.",
        // "interactiveCharts": "Interactive exploration of health outcomes by demographic variables.",
        // "maps": "Maps with overlays indicating health disparities and access to care by region."
        {
          title: "Health Insurance Coverage",
          description:
            "Pie charts display the insurance coverage status across different demographic groups, highlighting disparities.",
          type: "Pie Chart",
          chartJS: true,
          data: {
            labels: ["Insured", "Uninsured"],
            datasets: [
              {
                data: [85, 15],
                backgroundColor: [
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(255, 99, 132, 0.5)",
                ],
              },
            ],
          },
          VisualizationComponent: "Pie",
          options: {},
        },
      ],
      questions: [
        "Which demographic groups face the greatest challenges in accessing healthcare?",
        "How do health outcomes vary by demographic and location?",
      ],
      overview:
        "Investigating the disparities in health access and outcomes among various demographic groups to identify underlying causes and potential solutions.",
      keyInsights:
        "The study reveals significant disparities in health insurance coverage and outcomes, particularly affecting marginalized communities.",
      impact:
        "Highlighting the urgent need for policy interventions aimed at reducing health disparities and improving access to care for all.",
      tags: [
        "public health",
        "disparities",
        "insurance coverage",
        "demographics",
        "pie chart",
      ],
    },
    {
      title: "Economic Impact of COVID-19 on Minority-owned Businesses",
      subtitle: "A study on resilience and recovery.",
      defaultMappedVariable: {
        label: "Change in Revenue",
        code: "Custom_Code_CovidImpact",
      },
      studyObjective:
        "To assess the resilience and recovery of minority-owned businesses in the wake of the COVID-19 pandemic.",
      methodology:
        "The study analyzes economic data pre- and post-COVID-19 outbreak, focusing on business performance indicators across minority groups.",
      findings: [
        "Minority-owned businesses were disproportionately affected by the pandemic but showed varying degrees of resilience.",
        "Governmental support played a crucial role in the survival and recovery of these businesses.",
      ],
      implications:
        "Insights from the study highlight the need for equitable economic policies that ensure the sustainability of minority-owned businesses during crises.",
      visualization: [
        // "infographics": "Key statistics on the pandemic's impact on minority-owned businesses and their recovery paths.",
        // "interactiveCharts": "Dynamics of business performance indicators before and after the COVID-19 outbreak.",
        // "maps": "Spatial analysis of the economic impact on minority-owned businesses across different areas."
        {
          title: "Revenue Impact of COVID-19 on Minority-owned Businesses",
          description:
            "Line charts showing the revenue trends for minority-owned businesses before and after the onset of the COVID-19 pandemic.",
          type: "Line Chart",
          chartJS: true,
          data: {
            labels: ["2019", "2020", "2021"],
            datasets: [
              {
                label: "Revenue Change",
                data: [0, -30, -10],
                fill: false,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
              },
            ],
          },
          VisualizationComponent: "Line",
          options: {},
        },
      ],
      questions: [
        "How has the COVID-19 pandemic affected the revenue of minority-owned businesses?",
        "What measures have contributed to the resilience and recovery of these businesses?",
      ],
      overview:
        "Assessing the economic impact of the COVID-19 pandemic on minority-owned businesses to understand the factors contributing to their resilience and recovery.",
      keyInsights:
        "Minority-owned businesses have been disproportionately affected by the pandemic, with recovery rates varying significantly based on access to resources and support.",
      impact:
        "The findings emphasize the need for equitable support measures to ensure the sustainability and growth of minority-owned businesses in post-pandemic recovery efforts.",
      tags: [
        "COVID-19",
        "minority-owned businesses",
        "economic impact",
        "resilience",
        "recovery",
        "line chart",
      ],
    },
  ],
};

export { appConfig, referenceData };
