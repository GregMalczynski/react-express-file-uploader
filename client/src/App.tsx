import { useState, useEffect } from 'react';
import axios from 'axios';
import UploadContent from './components/UploadContent';
import TemplateContent from './components/TemplateContent';
import Loading from './components/Loading';

const App:React.FC = () => {

    const [ file, setFile ] = useState<any>()
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ uploadedFile, setUploadedFile ] = useState<any>([])
    const [ contentLoading, setContentLoading ] = useState<boolean>(false)

    const deleteContent = ( index: any ) => {
    const res: any = axios.delete('http://localhost:5000/upload', {
        headers: {
        'Content-Type': 'multipart/form-data'
        },
        data: {
            name: `${index}`
            }
    })
    
    const contentUpdate = uploadedFile.filter((item: any) => item.img.fileName !== index)
        setUploadedFile(contentUpdate)
    }

    return(
    <div className="app-wrapper">
      {contentLoading ? <Loading /> : null}
      <div className="loading-box"></div>
      <div style={contentLoading ? {filter: 'blur(6px)'} : {filter: 'none'}}>
        <h2>File Uploader</h2>
            <UploadContent 
                file={file} 
                setFile={setFile} 
                title={title} 
                setTitle={setTitle} 
                description={description} 
                setDescription={setDescription} 
                uploadedFile={uploadedFile} 
                setUploadedFile={setUploadedFile}
                setContentLoading={setContentLoading}
            />
            {uploadedFile.length ? 
              uploadedFile.map((item: any, index: any) => 
                <div key={index}>
                    <TemplateContent item={item} deleteContent={deleteContent} index={index}/> 
                </div>)
              : <p>No content...</p>
            }
        </div>
    </div>
    )
}
export default App;