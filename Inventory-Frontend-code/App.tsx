import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CycleStart,
  DS,
  Demo,
  InvPro,
  Postvrnc,
  Recount,
  Sample,
  SaveCycle,
  ViewInv,
} from './src/screens';
import {StockCheck} from './src/screens';
import {Invproducts} from './src/screens';
import {Dashboard} from './src/screens';
import {InvAdjSummary} from './src/screens';
import Login from './src/screens/Login';
import ScheduledStockCountScan from './src/screens/ScheduledStockCountScan';
import RecountStockCountScan from './src/screens/RecountStockCountScan';
import {CustomBottomSheet} from './src/components/CustomBottomSheet';
import PoCard from './src/screens/PurchaseOrder/LandingComp/PoCard';
import SummaryCard from './src/screens/PurchaseOrder/SummaryComp/SummaryCard';
import DetailCard from './src/screens/PurchaseOrder/PoDetailComp/DetailCard';
import {
  ItemScanner,
  PoSearch,
  StoreData,
  CycleCount,
  ViewInvPro,
  CountDtls,
} from './src/screens';
import {
  DsdSearch,
  DsdInvoice,
  Dsdproducts,
  InvAdj,
  TRsearch,
  TRproducts,
  Rtvsearch,
  Rtvdisplay,
  TRdetails,
  ViewDSD,
  ViewDetailsDsd,
  Viewrtv,
  ViewDetailsrtv,
} from './src/screens';
import Scanner from './src/screens/Scanner';
import StockCountadhoc from './src/screens/StockCountadhoc';
import StockCountadhocProducts from './src/screens/StockCountadhocProducts';
import AdhocCountDetails from './src/screens/AdhocCountDetails';
import BuddyStoreDetails from './src/screens/BuddyStoreDetails';
import BuddyStoreSearchedItem from './src/screens/BuddyStoreSearchedItem';
import StoreMap from './src/screens/StoreMap';
import StockCountScan from './src/screens/StockCountScan';
import AdhocRecount from './src/screens/AdhocRecount';
import AdhocRecountScan from './src/screens/AdhocRecountScan';
import AdhocPostVrnc from './src/screens/AdhocPostVrnc';
import PoLanding from './src/screens/PurchaseOrder/PoLanding';
import {MyProvider} from './src/StoreContext/LoggedStoreContext';
import PageTitle from './src/components/PageHeader';
import SearchBar_FS from './src/components/SearchBar_FS';
import {Button, createTheme, ThemeProvider, Icon} from '@rneui/themed';
import PoSummary from './src/screens/PurchaseOrder/PoSummary';
import PoDiscrepancySummary from './src/screens/PurchaseOrder/PoDiscrepancySummary';
import PoDetailPage from './src/screens/PurchaseOrder/PoDetailPage';
import KebabMenu from './src/screens/PurchaseOrder/kebabMenu';
import PoDetailScan from './src/screens/PurchaseOrder/PoDetailScan';
import {MyCardContextProvider} from './src/screens/PurchaseOrder/Context/CardContext';

import Test from './src/screens/Test';
const theme = createTheme({
  mode: 'light',
  lightColors: {
    primary: '#00338D',
    secondary: '#483698',
    tertiary: '#0091DA',
    white: '#f0f0f0',
    text: '#000000',
  },
});
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyProvider>
        <MyCardContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="PoLanding">
              <Stack.Screen
                name="Recount"
                component={Recount}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Test"
                component={Test}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="CycleStart"
                component={CycleStart}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="CountDtls"
                component={CountDtls}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Postvrnc"
                component={Postvrnc}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AdhocPostVrnc"
                component={AdhocPostVrnc}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Demo"
                component={Demo}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ViewInv"
                component={ViewInv}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ViewInvPro"
                component={ViewInvPro}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Invproducts"
                component={Invproducts}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="InvAdjSummary"
                component={InvAdjSummary}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="SaveCycle"
                component={SaveCycle}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AdhocCountDetails"
                component={AdhocCountDetails}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="CycleCount"
                component={CycleCount}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="StockCountadhoc"
                component={StockCountadhoc}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="StockCountadhocProducts"
                component={StockCountadhocProducts}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="StockCountScan"
                component={StockCountScan}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ScheduledStockCountScan"
                component={ScheduledStockCountScan}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="RecountStockCountScan"
                component={RecountStockCountScan}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AdhocRecountScan"
                component={AdhocRecountScan}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AdhocRecount"
                component={AdhocRecount}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Rtvsearch"
                component={Rtvsearch}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Rtvdisplay"
                component={Rtvdisplay}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="InvAdj"
                component={InvAdj}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="InvPro"
                component={InvPro}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TRsearch"
                component={TRsearch}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TRproducts"
                component={TRproducts}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TRdetails"
                component={TRdetails}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ViewDSD"
                component={ViewDSD}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ViewDetailsDsd"
                component={ViewDetailsDsd}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Viewrtv"
                component={Viewrtv}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ViewDetailsrtv"
                component={ViewDetailsrtv}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="DS"
                component={DS}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PoSearch"
                component={PoSearch}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DsdSearch"
                component={DsdSearch}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DsdInvoice"
                component={DsdInvoice}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Dsdproducts"
                component={Dsdproducts}
                options={{
                  headerShown: false,
                }}
              />

              {/* <Stack.Screen
          name="PurchaseOrder"
          component={PurchaseOrder}
          options={{
            headerShown: false
          }}
        /> */}

              <Stack.Screen
                name="StoreData"
                component={StoreData}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="BuddyStoreDetails"
                component={BuddyStoreDetails}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="BuddyStoreSearchedItem"
                component={BuddyStoreSearchedItem}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="StoreMap"
                component={StoreMap}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="StockCheck"
                component={StockCheck}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Sample"
                component={Sample}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ItemScanner"
                component={ItemScanner}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PoLanding"
                component={PoLanding}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PageTitle"
                component={PageTitle}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SearchBar_FS"
                component={SearchBar_FS}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="CustomBottomSheet"
                component={CustomBottomSheet}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="PoCard"
                component={PoCard}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PoSummary"
                component={PoSummary}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SummaryCard"
                component={SummaryCard}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PoDiscrepancySummary"
                component={PoDiscrepancySummary}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DetailCard"
                component={DetailCard}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PoDetailPage"
                component={PoDetailPage}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="KebabMenu"
                component={KebabMenu}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PoDetailScan"
                component={PoDetailScan}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MyCardContextProvider>
      </MyProvider>
    </ThemeProvider>
  );
}
