import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface CommentProps {
  comment: {
    _id: string;
    user: {
      avatar: string;
      name: string;
    };
    rating: number;
    createdAt: string;
    comment: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.userContainer}>
        <Image
          source={{ uri: comment.user.avatar }}
          style={styles.userAvatar}
        />
        <View>
          <Text style={styles.userName}>{comment.user.name}</Text>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={16} color="orange" />
            <Text style={styles.rating}>{comment.rating}</Text>
          </View>
          <Text style={styles.createdAt}>{comment.createdAt}</Text>
        </View>
      </View>
      <Text style={styles.commentText}>{comment.comment}</Text>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
  },
  userContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 5,
  },
  rating: {
    marginStart: 5,
  },
  createdAt: {
    color: "gray",
  },
  commentText: {
    fontSize: 16,
    marginTop: 10,
  },
});
