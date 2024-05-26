// interface LoaderParams{
//     userId: string
// }
// interface User {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     address: {
//       street: string;
//       suite: string;
//       city: string;
//       zipcode: string;
//       geo: {
//         lat: string;
//         lng: string;
//       };
//     };
//     phone: string;
//     website: string;
//     company: {
//       name: string;
//       catchPhrase: string;
//       bs: string;
//     };
//   }
// export async function loaderAlbums({params}: {params : LoaderParams}) {
//     const { userId, albumId } = params;
//     const responseUser= await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
//     const userData: User = await responseUser.json();

//     return{user: userData}
// }


// export default  function AlbumsPage() {

//   return (
//     <div>albums</div>
//   )
// }

