export interface TemplateProps{
    item: any,
    deleteContent: any,
    index: any,
}

const TemplateContent:React.FC <TemplateProps> = ({item, deleteContent, index}) => 

        <div className="template-wrapper">
            <div className="template-number">
                <div style={{marginTop: "14px"}}>
                    {index + 1}
                </div>
            </div>
            <div>
                <img style={{width: '150px'}} src={item.img.filePath} alt=''/>
            </div>
            <div className="template-text-wrapper">
                <div className="template-title">{item.title ? item.title : "no title"}</div>
                <div className="template-description">{item.description ? item.description : "no description"}</div>
                <button onClick={() => deleteContent(item.img.fileName)}>Remove</button>
            </div>
        </div>
    

export default TemplateContent;