import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { themes } from '../../../constants/colors';
import sharedStyles from '../../Styles';
import Touch from '../../../utils/touch';
import { IWorkspace } from '../index';

const styles = StyleSheet.create({
	container: {
		height: 56,
		paddingHorizontal: 15,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	content: {
		flex: 1,
		flexDirection: 'column'
	},
	server: {
		...sharedStyles.textMedium,
		fontSize: 16,
		paddingLeft: 8
	},
	serverAvatar: {
		width: 32,
		height: 32
	}
});

interface IItem {
	item: IWorkspace;
	theme: string;
	onPress(url: string): void;
}

const Item = ({ item, theme, onPress }: IItem): JSX.Element => (
	<Touch style={styles.container} onPress={() => onPress(item.url)} theme={theme} testID={`server-history-${item.url}`}>
		<Image style={styles.serverAvatar} source={{ uri: `https://${item.url}/assets/logo.png` }} />
		<View style={styles.content}>
			<Text numberOfLines={1} style={[styles.server, { color: themes[theme].bodyText }]}>
				{item.name}
			</Text>
		</View>
	</Touch>
);

export default Item;
