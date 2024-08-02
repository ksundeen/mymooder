import { StyleSheet, View, Text, TextInput } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import { useEffect, useState } from 'react';
import { crudMoodValuesMethods} from '@/app/database/crudMethods'
import { useSQLiteContext } from 'expo-sqlite';
import { ModalDeleteDataConfirm } from '../components/modals/ModalDeleteDataConfirm';
import ModalDeletedData from '../components/modals/ModalDeletedData';
import * as FileSystem from "expo-file-system";
const { deleteDatabaseData, getRecordCount } = crudMoodValuesMethods();

export default function SettingsComponent() {
    const [exportFilename, setExportFilename] = useState<string>('export_filename');
    const [recordCount, setRecordCount] = useState<number>(0);
    const [shouldDeleteData, setShouldDeleteData] = useState<boolean>(false);
    const [dataDeleted, setDataDeleted] = useState<boolean>(false);
    const [showDeleteDataConfirmModal, setShowDeleteDataConfirmModal] = useState<boolean>(false);
    const [showDeletedDataModal, setShowDeletedDataModal] = useState<boolean>(false);
    
    const db = useSQLiteContext();

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
    }

    useEffect(() => {
        countRecords();
    }, [])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Database Location: {recordCount}</Text>
                <ButtonComponent buttonWidth={75} onPress={() => showDatabaseLocation()} text='Show Database Location' />
            </View>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Record Count: {recordCount}</Text>
                <ButtonComponent buttonWidth={75} onPress={() => confirmDeleteData()} text='Delete Data' />
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

            <View style={styles.container}>
                <Text style={styles.textInput}></Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setExportFilename}
                    value={exportFilename}
                    placeholder="Database export filename"
                    keyboardType='numbers-and-punctuation'
                />
                {exportFilename.length > 0 ?
                    <ButtonComponent buttonWidth={75} onPress={() => exportData()} text='Export Data' />
                    :
                    <></>
                }

            </View>
        </>
      );
    };

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        marginTop: 5,
        alignItems: 'center',
      },
    textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})