# Unofficial API for fetching air quality data from Berkley Earth (PM 2.5 and PM 10 levels)

This is an unofficial rest API for getting air quality data from [Berkley Earth](http://berkeleyearth.org/) (PM 2.5 and PM 10 levels). The data filee from which the data is fetched are [here](http://berkeleyearth.lbl.gov/air-quality/maps/cities/)

## Endpoints

### List countries whose data is available

`https://berkleyearth-air-quality-api.herokuapp.com/list/countries`

**Response**

```
[
  {
    "countryName": "United States of America",
    "countryID": "United_States_of_America"
  },
  ...
]
```

| Property    | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| countryName | string | Name of the country                            |
| countryID   | string | ID which is used to fetch data for the country |

### List cities whose data is available

`https://berkleyearth-air-quality-api.herokuapp.com/list/cities`

**Query Parameters**

| Parameter | Type   | Description                               | Compulsary |
| --------- | ------ | ----------------------------------------- | ---------- |
| country   | string | Used to get all a cities of given country | false      |

Example Request URL
`https://berkleyearth-air-quality-api.herokuapp.com/list/cities?country=United States of America`

**Response**

```
[
  {
    "countryName": "United States of America",
    "countryID": "United_States_of_America",
    "regionName": "Alabama",
    "regionID": "Alabama",
    "cityName": "Birmingham",
    "cityID": "Birmingham"
  },
  ...
]
```

| Property    | Type   | Description                                                                          |
| ----------- | ------ | ------------------------------------------------------------------------------------ |
| countryName | string | Name of the country the city belong                                                  |
| countryID   | string | ID which is used as country URI parameter for fetching air quality data for the city |
| regionName  | string | Name of the region the city belong                                                   |
| regionID    | string | ID which is used as region URI parameter for fetching air quality data for the city  |
| cityName    | string | Name of the city                                                                     |
| cityID      | string | ID which is used as URI parameter for fetching air quality data for the city         |

### Get hourly air quality data for a country

`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/hourly-data/{countryID}?startDate={startDate}&endDate={endDate}`

**URI Parameters**

| Parameter | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| countryID | string | ID for country whose data is to be fetched |

**Query Parameters**

| Parameter | Type   | Description                                                                       | Compulsary |
| --------- | ------ | --------------------------------------------------------------------------------- | ---------- |
| startDate | string | Data is fetched starting from this date. **Format: `YYYY-MM-DD`**                 | true       |
| endDate   | string | Data is fetched till this date (this date not included). **Format: `YYYY-MM-DD`** | true       |

Example Request URL
`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/hourly-data/United_States_of_America?startDate=2020-01-01&endDate=2020-02-01`

**Response**

```
[
  {
    "DateTime": "2016-03-03T16:00:00",
    "PM2.5": 7.1,
    "PM10_mask": 0
  },
  ...
]
```

| Property  | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| DateTime  | string | Date and time for the value                                         |
| PM2.5     | number | Concentration of PM2.5 in µg/m³. _null if the value is not present_ |
| PM10_mask | number | Concentration of PM10 in µg/m³. _null if the value is not present_  |

### Get hourly air quality data for a city

`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/hourly-data/{countryID}/{regionID}/{cityID}?startDate={startDate}&endDate={endDate}`

**URI Parameters**

| Parameter | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| countryID | string | ID of country to which the city belongs whose data is to be fetched |
| regionID  | string | ID of region to which the city belongs whose data is to be fetched  |
| cityID    | string | ID of the city whose the data is to be fetched                      |

**Query Parameters**

| Parameter | Type   | Description                                                                       | Compulsary |
| --------- | ------ | --------------------------------------------------------------------------------- | ---------- |
| startDate | string | Data is fetched starting from this date. **Format: `YYYY-MM-DD`**                 | true       |
| endDate   | string | Data is fetched till this date (this date not included). **Format: `YYYY-MM-DD`** | true       |

Example Request URL
`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/hourly-data/United_States_of_America/New_York/New_York_City?startDate=2020-01-01&endDate=2020-02-01`

**Response**

```
[
  {
    "DateTime": "2016-03-03T16:00:00",
    "PM2.5": 7.1,
    "PM10_mask": 0
  },
  ...
]
```

| Property  | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| DateTime  | string | Date and time for the value                                         |
| PM2.5     | number | Concentration of PM2.5 in µg/m³. _null if the value is not present_ |
| PM10_mask | number | Concentration of PM10 in µg/m³. _null if the value is not present_  |

### Get daily air quality data (24 hrs average) for a country

`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/daily-average/{countryID}?startDate={startDate}&endDate={endDate}`

**URI Parameters**

| Parameter | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| countryID | string | ID of country to which the city belongs whose data is to be fetched |

**Query Parameters**

| Parameter | Type   | Description                                                                       | Compulsary |
| --------- | ------ | --------------------------------------------------------------------------------- | ---------- |
| startDate | string | Data is fetched starting from this date. **Format: `YYYY-MM-DD`**                 | true       |
| endDate   | string | Data is fetched till this date (this date not included). **Format: `YYYY-MM-DD`** | true       |

Example Request URL
`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/daily-average/United_States_of_America?startDate=2020-01-01&endDate=2020-02-01`

**Response**

```
[
  {
    "Date": "2016-01-04",
    "PM2.5": {
      "minValue": 4.4,
      "maxValue": 12.4,
      "avgValue": 8.104166666666666,
      "noOfObservations": 24,
      "totalNoOfPossibleObservations": 24
    },
    "PM10_mask": {
      "minValue": 0.01,
      "maxValue": 0.01,
      "avgValue": 0.010000000000000004,
      "noOfObservations": 24,
      "totalNoOfPossibleObservations": 24
    }
  },
  ...
]
```

| Property                                  | Type   | Description                                                                                                                                                                                                           |
| ----------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date                                      | string |                                                                                                                                                                                                                       |
| PM2.5                                     | object |                                                                                                                                                                                                                       |
| "PM2.5".minValue                          | number | Minimum hourly concentration value of PM2.5 in µg/m³ for the given date. _null if no data is present for the given date._                                                                                             |
| "PM2.5".maxValue                          | number | Maximum hourly concentration value of PM2.5 in µg/m³ for the given date. _null if no data is present for the given date._                                                                                             |
| "PM2.5".avgValue                          | number | Average concentration value of PM2.5 in µg/m³ for the given date. Calculated by dividing the total of all the observation by no. of observation for that given date. _null if no data is present for the given date._ |
| "PM2.5".noOfObservations                  | number | No. of observations for the given date. This can be used to determine if the avgValue can be trusted or not                                                                                                           |
| "PM2.5".totalNoOfPossibleObservations     | number | Total no. of possible observations. For ex. in the case of daily data it is always 24                                                                                                                                 |
| PM10_mask                                 | object |                                                                                                                                                                                                                       |
| "PM10_mask".minValue                      | number | Minimum hourly concentration value of PM10 in µg/m³ for the given date. _null if no data is present for the given date._                                                                                              |
| "PM10_mask".maxValue                      | number | Maximum hourly concentration value of PM10 in µg/m³ for the given date. _null if no data is present for the given date._                                                                                              |
| "PM10_mask".avgValue                      | number | Average concentration value of PM10 in µg/m³ for the given date. Calculated by dividing the total of all the observation by no. of observation for that given date. _null if no data is present for the given date._  |
| "PM10_mask".noOfObservations              | number | No. of observations for the given date. This can be used to determine if the avgValue can be trusted or not                                                                                                           |
| "PM10_mask".totalNoOfPossibleObservations | number | Total no. of possible observations. For ex. in the case of daily data it is always 24                                                                                                                                 |

### Get daily air quality data (24 hrs average) for a city

`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/daily-average/{countryID}/{regionID}/{cityID}?startDate={startDate}&endDate={endDate}`

**URI Parameters**

| Parameter | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| countryID | string | ID of country to which the city belongs whose data is to be fetched |
| regionID  | string | ID of region to which the city belongs whose data is to be fetched  |
| cityID    | string | ID of the city whose the data is to be fetched                      |

**Query Parameters**

| Parameter | Type   | Description                                                                       | Compulsary |
| --------- | ------ | --------------------------------------------------------------------------------- | ---------- |
| startDate | string | Data is fetched starting from this date. **Format: `YYYY-MM-DD`**                 | true       |
| endDate   | string | Data is fetched till this date (this date not included). **Format: `YYYY-MM-DD`** | true       |

Example Request URL
`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/daily-average/United_States_of_America/New_York/New_York_City?startDate=2020-01-01&endDate=2020-02-01`

**Response**

```
[
  {
    "Date": "2016-01-04",
    "PM2.5": {
      "minValue": 4.4,
      "maxValue": 12.4,
      "avgValue": 8.104166666666666,
      "noOfObservations": 24,
      "totalNoOfPossibleObservations": 24
    },
    "PM10_mask": {
      "minValue": 0.01,
      "maxValue": 0.01,
      "avgValue": 0.010000000000000004,
      "noOfObservations": 24,
      "totalNoOfPossibleObservations": 24
    }
  },
  ...
]
```

| Property                                  | Type   | Description                                                                                                                                                                                                           |
| ----------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date                                      | string |                                                                                                                                                                                                                       |
| PM2.5                                     | object |                                                                                                                                                                                                                       |
| "PM2.5".minValue                          | number | Minimum hourly concentration value of PM2.5 in µg/m³ for the given date. _null if no data is present for the given date._                                                                                             |
| "PM2.5".maxValue                          | number | Maximum hourly concentration value of PM2.5 in µg/m³ for the given date. _null if no data is present for the given date._                                                                                             |
| "PM2.5".avgValue                          | number | Average concentration value of PM2.5 in µg/m³ for the given date. Calculated by dividing the total of all the observation by no. of observation for that given date. _null if no data is present for the given date._ |
| "PM2.5".noOfObservations                  | number | No. of observations for the given date. This can be used to determine if the avgValue can be trusted or not                                                                                                           |
| "PM2.5".totalNoOfPossibleObservations     | number | Total no. of possible observations. For ex. in the case of daily data it is always 24                                                                                                                                 |
| PM10_mask                                 | object |                                                                                                                                                                                                                       |
| "PM10_mask".minValue                      | number | Minimum hourly concentration value of PM10 in µg/m³ for the given date. _null if no data is present for the given date._                                                                                              |
| "PM10_mask".maxValue                      | number | Maximum hourly concentration value of PM10 in µg/m³ for the given date. _null if no data is present for the given date._                                                                                              |
| "PM10_mask".avgValue                      | number | Average concentration value of PM10 in µg/m³ for the given date. Calculated by dividing the total of all the observation by no. of observation for that given date. _null if no data is present for the given date._  |
| "PM10_mask".noOfObservations              | number | No. of observations for the given date. This can be used to determine if the avgValue can be trusted or not                                                                                                           |
| "PM10_mask".totalNoOfPossibleObservations | number | Total no. of possible observations. For ex. in the case of daily data it is always 24                                                                                                                                 |

### Get monthly air quality data (monthly average) for a country

`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/monthly-average/{countryID}?startDate={startDate}&endDate={endDate}`

**URI Parameters**

| Parameter | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| countryID | string | ID of country to which the city belongs whose data is to be fetched |
| regionID  | string | ID of region to which the city belongs whose data is to be fetched  |
| cityID    | string | ID of the city whose the data is to be fetched                      |

**Query Parameters**

| Parameter | Type   | Description                                                                    | Compulsary |
| --------- | ------ | ------------------------------------------------------------------------------ | ---------- |
| startDate | string | Data is fetched starting from this date. **Format: `YYYY-MM`**                 | true       |
| endDate   | string | Data is fetched till this date (this date not included). **Format: `YYYY-MM`** | true       |

Example Request URL
`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/monthly-average/United_States_of_America?startDate=2020-01-01&endDate=2020-02-01`

**Response**

```
[
  {
    "Month": "2016-01",
    "PM2.5": {
      "minValue": 4.4,
      "maxValue": 12.4,
      "avgValue": 8.104166666666666,
      "noOfObservations": 24,
      "totalNoOfPossibleObservations": 24
    },
    "PM10_mask": {
      "minValue": 0.01,
      "maxValue": 0.01,
      "avgValue": 0.010000000000000004,
      "noOfObservations": 24,
      "totalNoOfPossibleObservations": 24
    }
  },
  ...
]
```

| Property                                  | Type   | Description                                                                                                                                                                                                              |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Month                                     | string |                                                                                                                                                                                                                          |
| PM2.5                                     | object |                                                                                                                                                                                                                          |
| "PM2.5".minValue                          | number | Minimum hourly concentration value of PM2.5 in µg/m³ for the given month. _null if no data is present for the given month._                                                                                              |
| "PM2.5".maxValue                          | number | Maximum hourly concentration value of PM2.5 in µg/m³ for the given month. _null if no data is present for the given month._                                                                                              |
| "PM2.5".avgValue                          | number | Average concentration value of PM2.5 in µg/m³ for the given month. Calculated by dividing the total of all the observation by no. of observation for that given month. _null if no data is present for the given month._ |
| "PM2.5".noOfObservations                  | number | No. of observations for the given month. This can be used to determine if the avgValue can be trusted or not                                                                                                             |
| "PM2.5".totalNoOfPossibleObservations     | number | Total no. of possible observations. For ex. in the case of daily data it is always 24                                                                                                                                    |
| PM10_mask                                 | object |                                                                                                                                                                                                                          |
| "PM10_mask".minValue                      | number | Minimum hourly concentration value of PM10 in µg/m³ for the given month. _null if no data is present for the given month._                                                                                               |
| "PM10_mask".maxValue                      | number | Maximum hourly concentration value of PM10 in µg/m³ for the given month. _null if no data is present for the given month._                                                                                               |
| "PM10_mask".avgValue                      | number | Average concentration value of PM10 in µg/m³ for the given month. Calculated by dividing the total of all the observation by no. of observation for that given month. _null if no data is present for the given month._  |
| "PM10_mask".noOfObservations              | number | No. of observations for the given month. This can be used to determine if the avgValue can be trusted or not                                                                                                             |
| "PM10_mask".totalNoOfPossibleObservations | number | Total no. of possible observations. For ex. in the case of daily data it is always 24                                                                                                                                    |

### Get monthly air quality data (monthly average) for a city

`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/monthly-average/{countryID}/{regionID}/{cityID}?startDate={startDate}&endDate={endDate}`

**URI Parameters**

| Parameter | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| countryID | string | ID of country to which the city belongs whose data is to be fetched |
| regionID  | string | ID of region to which the city belongs whose data is to be fetched  |
| cityID    | string | ID of the city whose the data is to be fetched                      |

**Query Parameters**

| Parameter | Type   | Description                                                                    | Compulsary |
| --------- | ------ | ------------------------------------------------------------------------------ | ---------- |
| startDate | string | Data is fetched starting from this date. **Format: `YYYY-MM`**                 | true       |
| endDate   | string | Data is fetched till this date (this date not included). **Format: `YYYY-MM`** | true       |

Example Request URL
`https://berkleyearth-air-quality-api.herokuapp.com/air-quality/monthly-average/United_States_of_America/New_York/New_York_City?startDate=2019-01&endDate=2020--01`

**Response**

```
[
  {
    "Month": "2016-01",
    "PM2.5": {
      "minValue": 4.4,
      "maxValue": 12.4,
      "avgValue": 8.104166666666666,
      "noOfObservations": 24,
      "totalNoOfPossibleObservations": 24
    },
    "PM10_mask": {
      "minValue": 0.01,
      "maxValue": 0.01,
      "avgValue": 0.010000000000000004,
      "noOfObservations": 24,
      "totalNoOfPossibleObservations": 24
    }
  },
  ...
]
```

| Property                                  | Type   | Description                                                                                                                                                                                                              |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Month                                     | string |                                                                                                                                                                                                                          |
| PM2.5                                     | object |                                                                                                                                                                                                                          |
| "PM2.5".minValue                          | number | Minimum hourly concentration value of PM2.5 in µg/m³ for the given month. _null if no data is present for the given month._                                                                                              |
| "PM2.5".maxValue                          | number | Maximum hourly concentration value of PM2.5 in µg/m³ for the given month. _null if no data is present for the given month._                                                                                              |
| "PM2.5".avgValue                          | number | Average concentration value of PM2.5 in µg/m³ for the given month. Calculated by dividing the total of all the observation by no. of observation for that given month. _null if no data is present for the given month._ |
| "PM2.5".noOfObservations                  | number | No. of observations for the given month. This can be used to determine if the avgValue can be trusted or not                                                                                                             |
| "PM2.5".totalNoOfPossibleObservations     | number | Total no. of possible observations. For ex. in the case of daily data it is always 24                                                                                                                                    |
| PM10_mask                                 | object |                                                                                                                                                                                                                          |
| "PM10_mask".minValue                      | number | Minimum hourly concentration value of PM10 in µg/m³ for the given month. _null if no data is present for the given month._                                                                                               |
| "PM10_mask".maxValue                      | number | Maximum hourly concentration value of PM10 in µg/m³ for the given month. _null if no data is present for the given month._                                                                                               |
| "PM10_mask".avgValue                      | number | Average concentration value of PM10 in µg/m³ for the given month. Calculated by dividing the total of all the observation by no. of observation for that given month. _null if no data is present for the given month._  |
| "PM10_mask".noOfObservations              | number | No. of observations for the given month. This can be used to determine if the avgValue can be trusted or not                                                                                                             |
| "PM10_mask".totalNoOfPossibleObservations | number | Total no. of possible observations. For ex. in the case of daily data it is always 24                                                                                                                                    |
