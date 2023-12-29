import { Card, CardHeader } from "@fluentui/react-components";
import { FC } from "react";


type SettingSectionProps = {
    title: string;
    content: JSX.Element;
  };
  
const SettingSection: FC<SettingSectionProps> = ({ title, content }) => {
    return (
      <Card style={{ boxShadow: "none" }}>
        <CardHeader header={<h3>{title}</h3>} description={content} />
      </Card>
    );
  };
  

export default SettingSection;