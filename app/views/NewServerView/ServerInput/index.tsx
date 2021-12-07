import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInputProps, View } from 'react-native';

import TextInput from '../../../containers/TextInput';
import * as List from '../../../containers/List';
import { themes } from '../../../constants/colors';
import I18n from '../../../i18n';
import Item from './Item';
import { IWorkspace } from '../index';

const styles = StyleSheet.create({
	container: {
		zIndex: 1
	},
	inputContainer: {
		marginTop: 0,
		marginBottom: 0
	},
	serverList: {
		maxHeight: 180,
		width: '100%',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 2,
		borderTopWidth: 0
	}
});

interface IServerInput extends TextInputProps {
	text: string;
	theme: string;
	serversHistory: any[];
	onSubmit(): void;
	onPressServerList(workspace: IWorkspace): void;
}

const ServerInput = ({ text, theme, onChangeText, onSubmit, onPressServerList }: IServerInput): JSX.Element => {
	const [, setFocused] = useState(false);

	const serverList = [
		{ name: 'PDIS Chat', url: 'rc.pdis.nat.gov.tw' },
		{ name: 'RAY Chat', url: 'raychat.pdis.nat.gov.tw' }
	];

	return (
		<View style={styles.container}>
			<TextInput
				label={I18n.t('PDIS_CUSTOM.Select_workspace')}
				placeholder={I18n.t('PDIS_CUSTOM.Workspace_URL_placeholder')}
				containerStyle={styles.inputContainer}
				value={text}
				returnKeyType='send'
				onChangeText={onChangeText}
				testID='new-server-view-input'
				onSubmitEditing={onSubmit}
				clearButtonMode='while-editing'
				keyboardType='url'
				textContentType='URL'
				theme={theme}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			{serverList?.length ? (
				<View
					style={[
						styles.serverList,
						{ backgroundColor: themes[theme].backgroundColor, borderColor: themes[theme].separatorColor }
					]}>
					<FlatList
						data={serverList}
						renderItem={({ item }) => <Item item={item} theme={theme} onPress={() => onPressServerList(item)} />}
						ItemSeparatorComponent={List.Separator}
					/>
				</View>
			) : null}
		</View>
	);
};

export default ServerInput;
