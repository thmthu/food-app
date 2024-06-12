import { View, Text, TextInput, ScrollView, StatusBar, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icon from "react-native-feather"
import { themeColors } from '../theme'
import Catagories from '../components/Catagories'
import { featured } from '../constants'
import FeatureRow from '../components/FeatureRow'
const styles = StyleSheet.create({
    logo: {
        height: 164,
        width: 64,
        resizeMode: 'contain', // This will ensure the image is resized to fit within the dimensions provided
    },
});
const stylesCart = StyleSheet.create({
    container: {
        width: 120,
        borderRadius: 10,
    },
    img: {
        width: 120,
        height: 50,

    }
})
export default function HomeScreen() {
    const [featured2, setFeatured] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://172.29.16.1:3000/featured');
                const data = await response.json();
                setFeatured(data.results);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);
    return (
        <SafeAreaView className="bg-white">
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'dark-content'}
            // hidden={hidden}
            />
            <View className="flex-row items-center space-x-2 px-4 mt-3 pb-4 ">
                <View className=" flex-row flex-1 items-center  px-1 pb-1.5 gap-2 rounded-full border border-slate-400">
                    <Icon.Search stroke="gray" width={15} height={15} />
                    <TextInput placeholder='Restaurant' className=" flex-1"></TextInput>
                    <View className="flex-row space-x-1 px-2 border-gray justify-center items-center">
                        <Icon.MapPin stroke="gray" width={20} height={20} />
                        <Text>HCM</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: themeColors.bgColor(1) }} className="p-3 bg-gray-300 rounded-full">
                    <Icon.Sliders strokeWidth={2.5} stroke="white" width={20} height={20} />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >

                <Catagories />

                <View className="mt-2">
                    {
                        featured2.map((item, index) => {
                            return (
                                <FeatureRow
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    featuredId={item.id}
                                />
                            )

                        })

                    }
                </View>

            </ScrollView>

        </SafeAreaView >

    )
}