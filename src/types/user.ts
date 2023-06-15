export default interface User {
    id:                                 number        
    fullname:                           string    
    email:                              string     
    password:                           string | null    
    bio:                                string | null    
    avatar:                             string | null   
    interests:                          string[]   
    birthDate:                          string | null  
    isPrivate:                          boolean    
    isOnline:                           boolean   
    postIds:                            number[]
  }