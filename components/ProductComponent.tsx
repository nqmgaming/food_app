import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export interface Props {
    id: string;
    name: string;
    price: number;
    image: string;
}

const ProductComponent = (prop: Props) => {
    const { id, name, price, image } = prop;
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                console.log(id);
                router.navigate({
                    pathname: "productDetail",
                    params: { id: id },
                });
            }}
        >
            <Image
                source={{
                    uri: image,
                }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {name}
            </Text>
            <Text style={styles.price}>{price} VNĐ</Text>
            <View style={styles.sellingFast}>
                <Text style={styles.sellingFastText}>Đang bán chạy</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        borderColor: "gray",
        borderWidth: 1,
        width: 150,
        alignItems: "center",
        marginEnd: 10,
    },
    image: {
        width: 120,
        height: 120,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        width: 120,
    },
    price: {
        color: "red",
    },
    sellingFast: {
        borderRadius: 5,
        backgroundColor: "#ee4d2d",
        padding: 5,
    },
    sellingFastText: {
        color: "white",
        textAlign: "center",
    },
});
