/**/



declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB_USERNAME:string;
        DB_PASSWORD:string;
        DB_NAME:string;
        DB_PORT:string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}