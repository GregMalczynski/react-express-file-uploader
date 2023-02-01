import axios from "axios"

export interface UploadProps{
    file: any,
    setFile: any,
    title: any,
    setTitle: any,
    description: any,
    setDescription: any,
    uploadedFile: any,
    setUploadedFile: any,
    setContentLoading: any,
}

const UploadContent:React.FC <UploadProps> = ({file, setFile, title, setTitle, description, setDescription, uploadedFile, setUploadedFile, setContentLoading}) => {

    const choiceFile = (e: any) => {
        const file = e.target.files[0]
        if(!file) return
        setFile(file)
        console.log(file.name)
    }

    const uploadFile = async (e: React.FormEvent) => {
        e.preventDefault()

        setContentLoading(true)

        const formData = new FormData()
        formData.append('file', file)
        console.log('file ' + file)
    
        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('response' + res.data)
            setUploadedFile([...uploadedFile, {img: res.data, title: title, description: description}])
            setContentLoading(false)
        } catch(err: any) {
            if(err.response.status === 500 ) {
                console.log('Server problem...')
            } else {
                console.log(err.response.data.msg)
            }
        }
        setTitle('');
        setDescription('');
      }

    return(
        <div>
            <form className="upload-wrapper" onSubmit={uploadFile}>
                <div className="upload-wrapper-left">
                    <input className="custom-input-file" type="file" onChange={choiceFile}/>
                    <button className="input-file-button">
                        <i style={{fontSize: "1.6rem"}}>+ Add Image +</i><br/>
                        <i style={{fontSize: "1.2rem"}}>Browse / Drag file here</i><br/>
                        <i style={{fontSize: "1rem"}}>{file ? file.name : "..."}</i>
                    </button>
                </div>
                <div className="upload-wrapper-right">
                    <input 
                        className="input-title" 
                        type="text" placeholder="add image title..." 
                        value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
                    <textarea 
                        className="input-description" 
                        value={description} placeholder="add image description..." 
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}/>
                    <button type="submit">Upload</button>
                </div>
            </form>
        </div>
    )
}

export default UploadContent;