import { Link, RouteComponentProps } from "@reach/router"

const NotFound = (props: RouteComponentProps) => {
   return (
     <>
       <div>Error 404</div>
       <div>
         <Link to="/">
           Strona nie została znaleziona <br />
           <small>Page not found</small>
         </Link>
       </div>
     </>
   );
};

export default NotFound; 