import { View, Text, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Icon from "react-native-feather"
import { themeColors } from '../theme';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';
import { selectItems } from '../slices/cartSlice';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;


export default function RestaurantScreen() {

    const myRoute = useRoute();
    const params = myRoute.params;
    const id = params.resID;
    const navi = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setRestaurant({ ...params }))
    }, [dispatch, params])

    const [dishes, setDishes] = useState([]);
    const [res, setRes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response2 = await fetch(`http://172.29.16.1:3000/restaurant/${id}`);
                // You should do something with the response2 here
                const data2 = await response2.json();
                const featuredArray2 = await data2.results;
                //console.log(featuredArray2[0].image);
                setRes(featuredArray2);
                const response = await fetch(`http://172.29.16.1:3000/restaurantDetails/${id}`);
                const data = await response.json();
                const featuredArray = await data.results;
                setDishes(featuredArray);
                console.log("==============res", featuredArray2[0], featuredArray2[0].image);
                console.log("==============dishes", featuredArray, featuredArray2[0].image);



            } catch (error) {
                console.error("Error fetching data2: ", error);
            }
        };

        // const fetchData2 = async () => {
        //     try {
        //         const response = await fetch(`http://172.29.16.1:3000/restaurant/${id}`);
        //         // You should do something with the response here
        //         const data = await response.json();
        //         const featuredArray = await data.results;
        //         console.log("==============", featuredArray);
        //         console.log(featuredArray[0].image);
        //         setRes(featuredArray);
        //     } catch (error) {
        //         console.error("Error fetching data: ", error);
        //     }
        // };

        fetchData();
        //fetchData2();
    }, []);
    // // const res=[];
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const urls = [
    //             `http://172.29.16.1:3000/restaurantDetails/${id}`,
    //             `http://172.29.16.1:3000/restaurant/${id}`,
    //         ];

    //         try {
    //             const responses = await Promise.all(urls.map(url => fetch(url)));
    //             const data = await Promise.all(responses.map(response => {
    //                 if (!response.ok) {
    //                     throw new Error(`HTTP error! status: ${response.status}`);
    //                 }
    //                 return response.json();
    //             }));
    //             if (data[0] && data[0].results) {
    //                 console.log(data[0].results.name);
    //             }
    //             else console.log("no data");
    //             console.log("==============", data[0].results);
    //             console.log("==============", data[1].results);
    //             // data is now an array of responses, you can access each response like this:
    //             setDishes(data[0].results);
    //             setRes(data[1].results);

    //         } catch (error) {
    //             console.log('There was a problem with the fetch operation: ' + error.message);
    //         }
    //     };

    //     fetchData();
    // }, []);
    return (
        <View className='flex-1'>
            <StatusBar barStyle="light-content" />

            <CartIcon />
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}>
                <View className="relative">
                    {console.log("this is res ======== ", res)}
                    <StatusBar themeColors='white'></StatusBar>
                    {res[0] && <Image source={{ uri: res[0].image }} style={{ width: screenWidth, height: 100 }} />}
                    <TouchableOpacity
                        onPress={() => navi.goBack()}
                        className="absolute rounded-full bg-white p-2 top-5 left-4">
                        <Icon.ArrowLeft stroke={themeColors.bgColor(1)} strokeWidth={3}></Icon.ArrowLeft>
                    </TouchableOpacity>
                </View>
                <ScrollView

                    className="rounded-t-3xl -mt-8 bg-white pb-36">
                    <View className="flex mt-3 ml-3" >
                        <View>
                            {res[0] && <Text className=" mb-2 text-4xl font-extrabold">{res[0].name}</Text>}
                        </View>
                        <View className="flex-row mb-2 gap-2">
                            <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4"></Image>
                            <Text>
                                ({res[0] && res[0].reviews} review) <Text className=" font-bold text-gray-600">{params.category}</Text>
                            </Text>
                            <Icon.MapPin stroke="gray" width={20} height={20} />
                            {res[0] && <Text className=" text-gray-400 font-bold">Nearby {res[0].address}</Text>}
                        </View>
                        {res[0] && <Text className="text-gray-600 text-m ">{res[0].description}</Text>}
                        <Text className="text-2xl font-extrabold my-2">Menu</Text>
                        {
                            dishes.map((dish, index) =>
                                <DishRow
                                    key={index}
                                    item={dish}
                                />
                            )
                        }


                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    )
}   