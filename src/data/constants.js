const mainURL="https://api.ctelecom.ir"
const mapApiKey="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFhOWI5NWRjMjUxMDViMzRmMTA2ZWVhNjYxZjU2YjBhZDMyM2RjNDViOWNjODUzYjc1ZmE0YjVmOGNhNjdiMWRiYzliNDYzMjkzOTE0NWI4In0.eyJhdWQiOiIxODYxNyIsImp0aSI6ImFhOWI5NWRjMjUxMDViMzRmMTA2ZWVhNjYxZjU2YjBhZDMyM2RjNDViOWNjODUzYjc1ZmE0YjVmOGNhNjdiMWRiYzliNDYzMjkzOTE0NWI4IiwiaWF0IjoxNjU2OTMzNjUyLCJuYmYiOjE2NTY5MzM2NTIsImV4cCI6MTY1OTUyNTY1Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.S1Q8qNkLIjldUR53gzAES58eZGfExxcfbb1Rgp9pJsYA_3RDS-7eAdL0c8j-KB7iB-hR47e6mIbaFYRAPirhffebUY9zm4b1s_Je3DcyWdSGWUn3iEQZia5qYbSd7TLw3U0E6EIWoYpee7nieZrq0dPnglFCJY_cSQAH0-EQiu6ou5RKZBs_dub7VTwNd11B2_zyjnvS0k3K9UklMinGdf-Ygp9bbT55wwwnTTwIYOPcpLtMy-s60EFv1_rbCELc3Y7TRcReYzSF6it5l4wpl9fl9SvkR7EiDcINptf1XZs-I-bDMY4Entu_m-uyn-ZgBL59E2RxRpNrVyB2JdKTHw"
const browser=[
    {
        name:"chrome"
    },
    {
        name:"firefox"
    },
    {
        name:"safari"
    }
]
const defaultCoordinates=[51.420470, 35.729054]
const radius=[
    "500m","1000m","1500m","2000m"
]
module.exports={
    browser,
    radius,
    mainURL,
    mapApiKey,
    defaultCoordinates
    
}