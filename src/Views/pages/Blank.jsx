import { NewMenu } from "../NewMenu";

import React, { useCallback, useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import './Blank.scss';
import { GetMainInfo_Contact } from "../../Services/APIServices_2";
import { Button } from "@material-ui/core";


const Blank = () => {
    const [user, setuser] = useState();
    const [user2, setuser2] = useState([
        'Salah Amjad','Zaid Lawi'
    ]);
    const [result, setResult] = useState();


    const GetAllData = useCallback(async () => {
        const result = await GetMainInfo_Contact();
        if (result) {
       
          const sortedResult = result.data.sort((a, b) => a.Id.localeCompare(b.Id));
          setResult(sortedResult);
        //   setuser(result[0].User_Name__c)
        } else setResult(null);
      }, []);
    

    const Filter = {
        $schema: 'http://powerbi.com/product/schema#basic',
        target: {
          table: 'Contact',
          column: 'User_Name__c',
        },
        operator: 'In',
        values: [user],
        filterType: models.FilterType.BasicFilter,
        requireSingleSelection: true,
      };



      useEffect(() => {
   
   
          GetAllData();
      }, [GetAllData]);

    return <div>        
        
        
        
         
        <div style={{marginBottom: '5%'}}>  <NewMenu /></div>
      
        <Button
                          style={{ margin: "1%" }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                          setuser(result[0].User_Name__c)
                          }}
                        >
                          Set Salah
                        </Button>
        <Button
                          style={{ margin: "1%" }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                          setuser('Zaid Lawi')
                          }}
                        >
                       Set Zaid
                        </Button>
 
        <div className='dashboardMain-PowerBIEmbed'>
        { result !== null && (
        <div className='dashboardMain'>
          <PowerBIEmbed
            embedConfig={{
              type: 'report',
              id: 'cb678a26-100e-46da-979a-554c4e9fb719',
              embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=cb678a26-100e-46da-979a-554c4e9fb719&groupId=cca432c1-c265-49e3-a438-08c298ad4728&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUUtUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
              accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZmJlN2Y5NTItM2Y1Mi00ZjUwLTkzNmUtYzg1ZDViN2RiZDFmLyIsImlhdCI6MTY5NDYyNjU0MywibmJmIjoxNjk0NjI2NTQzLCJleHAiOjE2OTQ2OTg4NDMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VUFBQUFDb2RRazFpSUV1OUZpaktOc1Ntc1dLTmMrYVhkb0RPcDcrUnFwdVFBYldMcGgxZTRMcU4vK0hVTmxyZDNvQk9oIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjU3N2RjZGRjLWIwZjYtNGI0Yy05Zjk5LTJiMWJhYzQzNjhjMCIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiQUxLaGF0ZWViIiwiZ2l2ZW5fbmFtZSI6IkFobWFkIiwiaXBhZGRyIjoiOTIuMjUzLjMxLjIyMCIsIm5hbWUiOiJBaG1hZCBBTEtoYXRlZWIiLCJvaWQiOiIwYTRiMDM2Ni0xNGNiLTQ2ZDYtYjVkYS1lMWIwY2U5ZTA4MDMiLCJwdWlkIjoiMTAwMzIwMDFDRThGODVDRSIsInJoIjoiMC5BVTRBVXZubi0xSV9VRS1UYnNoZFczMjlId2tBQUFBQUFBQUF3QUFBQUFBQUFBQk9BRUkuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInN1YiI6InlMYUhSUjJlNk8wWHF5X09HX0NtbG10MkRHUThxbmJSTHNfclFGbXhnRGMiLCJ0aWQiOiJmYmU3Zjk1Mi0zZjUyLTRmNTAtOTM2ZS1jODVkNWI3ZGJkMWYiLCJ1bmlxdWVfbmFtZSI6ImFkbWluQHBzaWRhc2hib2FyZC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJhZG1pbkBwc2lkYXNoYm9hcmQub25taWNyb3NvZnQuY29tIiwidXRpIjoiZl9zOElwaGp5MEdUZUJNM2haSlJBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiOWI4OTVkOTItMmNkMy00NGM3LTlkMDItYTZhYzJkNWVhNWMzIiwiYTllYTg5OTYtMTIyZi00Yzc0LTk1MjAtOGVkY2QxOTI4MjZjIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19wbCI6ImVuLVVTIn0.LiGlk9pB7zs_lji4maXm-kQOo1RnUoHhwEpSUWSx4f1idM0GXKLEXYhqj9NnXnKvfNRBZmpUtWg2QZun1yLX3Rn8aTJYN49uPBrKRnEw-GarM6b3ge0eBqWht0iqDVL-PAe1FWLeutiL-LpwuduckO7sVYUvQ6RD13dOBuBGhBKY-H1YNPytuzQdi-QgmdLvIfV01SMZmXzx-If4t1F79lxpJ5Hm7pGm3_Oq8HlDRVyxlMl6Y4AVUIcqKEuhNp___4RkiFM2uC8wLxlTSWPFzBZ0-qsf7l3qyGmUD7JQwx0KIDdbEUQBj_HbMu--0QcNfpo9A5TNtO4rx2NfyqUcww',
              pageView: 'fitToWidth',
              filters: [Filter],
              settings: {
                customLayout: {
                  displayOption: models.DisplayOption.FitToWidth,
                },
                filterPaneEnabled: false,
                navContentPaneEnabled: false,
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
                background: models.BackgroundType.Transparent,
              },
            }}
            eventHandlers={
              new Map([
                [
                  'loaded',
                  () => {
                    console.log('Report loaded');
                  },
                ],
                [
                  'rendered',
                  () => {
                    console.log('Report rendered');
                  },
                ],
                [
                  'error',
                  (event, embed) => {
                    const error = event.detail;

                    if (
                      error.detailedMessage === 'Get report failed' ||
                      error.detailedMessage ===
                      'Access token has expired, resubmit with a new access token' ||
                      error.detailedMessage ===
                      'Fail to initialize - Could not resolve cluster'
                    ) {
                 
                    } else console.log(error.detailedMessage);
                  },
                ],
              ])
            }
            cssClassName='report-style-class'
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </div>
)}
    </div>
        
        </div>;
};

export default Blank;
