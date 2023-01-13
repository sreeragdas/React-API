
As the api and the csv file are already provied  . 
I have used both api to retrive the data using axios and store that data into a state.
After storing the data to state I have converted the csv data into array  and maped those data into the table .
 As the datas are maped I have put a onclick fucntion to the symbol so whene we click on the symbol it will navigate to the "Quote" component using router-dom . 
 Apart from that I have send symbol as  params using useLocation to "Quote" component.
For search functionality I have used fuse.js which is a 3rd party lib for fuzzy search.
