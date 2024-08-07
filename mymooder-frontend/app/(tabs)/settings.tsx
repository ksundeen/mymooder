import { StyleSheet, View, Text, TextInput, Image } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import { useEffect, useMemo, useState } from 'react';
import { crudMoodValuesMethods} from '@/app/database/crudMethods'
import { useSQLiteContext } from 'expo-sqlite';
import { ModalDeleteDataConfirm } from '../components/modals/ModalDeleteDataConfirm';
import ModalDeletedData from '../components/modals/ModalDeletedData';
import * as FileSystem from "expo-file-system";
import { Colors } from '../constants/Colors';
const { deleteDatabaseData, getRecordCount, loadSampleData } = crudMoodValuesMethods();
import RadioGroup from 'react-native-radio-buttons-group';
import ParallaxScrollView from '../components/ParallaxScrollView';

export default function SettingsComponent() {
    const [selectedRadioId, setSelectedRadioId] = useState('1');
    const defaultTextInput = 'export_filename'
    const [exportFilename, setExportFilename] = useState<string>(defaultTextInput);
    const [recordCount, setRecordCount] = useState<number>(0);
    const [shouldDeleteData, setShouldDeleteData] = useState<boolean>(false);
    const [dataDeleted, setDataDeleted] = useState<boolean>(false);
    const [showDeleteDataConfirmModal, setShowDeleteDataConfirmModal] = useState<boolean>(false);
    const [showDeletedDataModal, setShowDeletedDataModal] = useState<boolean>(false);
    const [databaseLocation, setDatabaseLocation] = useState<string>("")
    
    const db = useSQLiteContext();

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Recreate Tables',
            value: 'recreate'
        },
        {
            id: '2', 
            label: 'Delete Database',
            value: 'delete'
        },
    ]), []);

    const countRecords = async () => {
        console.log('Counting records...')
        const result = await getRecordCount(db)
        console.log(JSON.stringify(result))
        setRecordCount(result)
    };

    const confirmDeleteData = () => {
        setShowDeleteDataConfirmModal(true)
    };

    useEffect(() => {
        if (shouldDeleteData) {
            console.log(`State after checking 'shouldDeleteData': shouldDeleteData=${shouldDeleteData},
                dataDeleted=${dataDeleted}, showDeleteDataConfirmModal=${showDeleteDataConfirmModal},
                showDeletedDataModal=${showDeletedDataModal}`)
            deleteData()
            setShouldDeleteData(false)
        }
    }, [shouldDeleteData]);

    useEffect(() => {
        if (dataDeleted) {
            console.log(`State after checking 'dataDeleted': shouldDeleteData=${shouldDeleteData},
                dataDeleted=${dataDeleted}, showDeleteDataConfirmModal=${showDeleteDataConfirmModal},
                showDeletedDataModal=${showDeletedDataModal}`)
            setShowDeletedDataModal(true)
            setShouldDeleteData(false)
            setDataDeleted(false)
            countRecords()
        }
    }, [dataDeleted]);

    const deleteData = async () => {
        console.log('Will be deleting data...')
        await deleteDatabaseData(db)
        setDataDeleted(true)
    };

    const exportData = () => { 
        if (exportFilename.length > 0) {
            // export the sqlite *.db
            console.log(`Will be exporting data as ${exportFilename}.db`)
        }
    };

    const showDatabaseLocation = async () => {
        console.log(FileSystem.documentDirectory)
        setDatabaseLocation(JSON.stringify(FileSystem.documentDirectory))   
    }

    useEffect(() => {
        countRecords();
    }, [])

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={<Image source={require('@/assets/images/settings.png')} style={styles.headerImage}
            />}
        >
            <View style={styles.container}>
                <View style={[styles.containerDbLocation, styles.borderStyle]}>
                    <Text style={styles.textTitle}>Database File Location</Text>
                    <View style={styles.buttonRow}>
                        <ButtonComponent buttonWidth={125} onPress={() => showDatabaseLocation()} text='Show Database Location' />
                        <ButtonComponent extraStyles={{left: "40%"}} diffFontSize={10} buttonWidth={50} onPress={() => setDatabaseLocation('')} text='Clear' />
                    </View>
                    <Text style={styles.textStyle}>Database Location: {databaseLocation}</Text>
                </View>

                <View style={[styles.containerCount, styles.borderStyle]}>
                    <Text style={styles.textTitle}>Record Count</Text>
                    <View style={styles.buttonColumn}>
                        <ButtonComponent extraStyles={{top: "40%", margin: 10}} buttonWidth={125} onPress={() => countRecords()} text='Count Records' />
                        <Text style={[styles.textStyle, styles.textCount]}>{recordCount}</Text>
                    </View>
                </View>

                <View style={[styles.containerSampleData, styles.borderStyle]}>
                    <Text style={styles.textTitle}>Sample Data</Text>
                    <ButtonComponent extraStyles={{top: "75%", margin: 15}} buttonWidth={125} onPress={() => loadSampleData(db)} text='Load Sample Data' />
                </View>

                <View style={[styles.containerDelete, styles.borderStyle]}>
                    <Text style={styles.textTitle}>Deleting Data</Text>
                    {/* <View> */}
                        <ButtonComponent extraStyles={{top: "25%", margin: 10}} buttonWidth={125} onPress={() => confirmDeleteData()} text='Delete Data' />
                        <RadioGroup
                            layout='row' 
                            containerStyle={styles.radioGroupContainerStyle}
                            radioButtons={radioButtons} 
                            onPress={setSelectedRadioId}
                            selectedId={selectedRadioId}
                        />
                    {/* </View> */}
                        {(showDeleteDataConfirmModal && !showDeletedDataModal) ? 
                            <ModalDeleteDataConfirm
                                setShouldDeleteDataCaller={setShouldDeleteData}
                                showModal={showDeleteDataConfirmModal}
                                setShowModalCaller={setShowDeleteDataConfirmModal}
                            />
                            :
                            <></>
                        }
                        {(!showDeleteDataConfirmModal && showDeletedDataModal) ?
                            <ModalDeletedData
                                showModal={showDeletedDataModal}
                                setShowModalCaller={setShowDeletedDataModal}
                            >
                            </ModalDeletedData>
                            :
                            <></>
                        }
                </View>

                <View style={[styles.containerExport, styles.borderStyle]}>
                    <Text style={styles.textTitle}>Enter a filename for the export</Text>
                    <TextInput
                        style={exportFilename == defaultTextInput ? [styles.textInput, styles.textInputDefault] : [styles.textInput, styles.textInputFilled]}
                        onChangeText={setExportFilename}
                        value={exportFilename}
                        placeholder="Database export filename"
                        keyboardType='numbers-and-punctuation'
                    />
                    {exportFilename.length > 0 ?
                        <ButtonComponent buttonWidth={125} onPress={() => exportData()} text='Export Data' />
                        :
                        <></>
                    }
                </View>

            </View>
            </ParallaxScrollView>
      );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        alignItems: 'center',
        padding: 15,
    },
    headerImage: {
        position: 'relative',
        height: 250,
        width: 450,
      },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 20,
        padding: 15,
    },
    buttonColumn: {
        flexDirection: 'column',
        paddingTop: 5,
        // marginBottom: 10,
        padding: 15,
    },
    borderStyle: {
        flex: 0.75,
        margin: 5,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 0.5,
        width: "125%",
        backgroundColor: Colors.lighterGrey,
    },
    containerDbLocation: {
        padding: 10,
        alignItems: 'center',
    },
    containerCount: {
        paddingBottom: -500,
    },
    containerDelete: {
        flex: 0.9,
        // margin: 10,
        padding: 10,
        // paddingBottom: 0,
        alignItems: 'center',
    },
    radioGroupContainerStyle: {
        paddingTop: 40,
        paddingHorizontal: 60
    },
    containerSampleData: {
        margin: 10,
        paddingBottom: 45,
        alignItems: 'center',  
    },
    containerExport: {
        padding: 15,
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        top: 1,
        left: "10%",
        right: "10%",
        padding: 10,
    },
    textCount: {
        marginTop: 25,
        bottom: 0,
    },
    textStyle: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        paddingTop: 10,
    },
    textInput: {
        height: 40,
        margin: 25,
        borderWidth: 1,
        padding: 10,
      },
    textInputDefault: {
        color: 'gray'
    },
    textInputFilled: {
        color: 'black',
    },
})