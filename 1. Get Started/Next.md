## To create next app:

npx create-next-app@latest

it will ask some config question:
to use src make it yes with right click of mouse on Yes


## Routing

to make a route we need to go inside src/app folder.

if we are making a component directly inside app folder with file name as page.tsx and default export from it then this will be visible
at home means it will be present at route => localhost:3000/

but it we want to make a route like=> localhost:3000/user  
then we need make a folder src/app/user and need to create a component with file name as page.tsx inside it with default export.

and to make a route like => localhost:3000/user/friends 
then we need to make a folder src/app/user/friends and need to create a component with file name as page.tsx inside it with default export.

## Common layout

To render the common layout like header, we can render it inside layout.tsx file .

layout file is like parent for ever other component and other components like page.tsx are taken as 
children props by layout file.

## showing image

1. we can put images inside public folder
2. we can use Image component from next/image library.
   Image component do performance optimization like image reside based on device size.
3. import image like: import homeImg from '/public/home.jpg';
4. use <Image src={homeImg} alt="car factory"/>

## note about Image component

if we are rendering an image and some text then 
1. in normal case(not using Image component), if image takes time to load then text will be at the place
    of image. and one image completes the loading then text will shift to the right.
2. But if using Image component then even if images not loaded then text will apear at the right place
    where it should be.
    Reason for that is Image component uses a place holder with the same size of the image (by default and this default size we can see by console.log the imported image).
    But we can also change the size of place holder using below options:    
    a.) <Image src={homeImg} alt="car factory" fill />  // option fill is used to cover entire available space
    b.) <Image src={homeImg} alt="car factory" width={600} height={800}/> // 


## Deployment nextjs apps

npx vercel -> ask to install a package vercel -> y 
-> Login using github account 
-> set up and deploy -> Y 
-> which scope do you want to deploy to -> default 
-> link to existing account -> n 
-> what is your project name -> corp 
-> in which directory is your code located -> ./ (it is asking about root project directory) 
-> want to modify these settings -> n ->

it will give two links:
1. to loging:  https://vercel.com/sachins-projects-eb15fe29/corp/Ed3ZjtojUsmRjuGpBiNe4jcW3Dc6
2. preview:   https://corp-5h0361rfw-sachins-projects-eb15fe29.vercel.app

