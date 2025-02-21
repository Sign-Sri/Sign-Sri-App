import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SortByScreen = () => {
    const posts = [
        { id: '1', username: 'User1', text: 'Post 1' },
        { id: '2', username: 'User2', text: 'Post 2' },
        { id: '3', username: 'User3', text: 'Post 3' },
    ];

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.postContent}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.postText}>{item.text}</Text>
            </View>

            <View style={styles.postInteractions}>
                <TouchableOpacity style={styles.interactionButton} onPress={() => console.log(`Like pressed for post ${item.id}`)}>
                    <Icon name="heart" size={30} color="gray" />
                    <Text style={styles.interactionCount}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.interactionButton} onPress={() => console.log(`Comment pressed for post ${item.id}`)}>
                    <Icon name="comment" size={30} color="gray" />
                    <Text style={styles.interactionCount}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.interactionButton} onPress={() => console.log(`Share pressed for post ${item.id}`)}>
                    <Icon name="share" size={30} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sort By</Text>
            </View>
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DFEAF6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#143F6B',
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    postContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    postContent: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
    },
    postText: {
        fontSize: 16,
        marginBottom: 5,
    },
    postInteractions: {
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    interactionButton: {
        alignItems: 'center',
        marginBottom: 15,
    },
    interactionCount: {
        color: 'gray',
        fontSize: 12,
    },
});

export default SortByScreen;