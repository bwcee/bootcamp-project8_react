import { Card, CardContent, CardHeader, IconButton} from "@material-ui/core";
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

const RouteCard = ({ route, deleteRoute }) => {
  
  return (
    <div>
      <Card elevation={1}>
        <CardHeader 
        action={
          <IconButton onClick={()=> deleteRoute(route.id)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={route.name} subheader={`Difficulty: ${route.difficulty}`} />
        
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            voluptas quo sequi, quas quam minima praesentium ad officia alias
            ducimus dolores ut, non, placeat iure provident harum assumenda
            obcaecati at!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteCard;
