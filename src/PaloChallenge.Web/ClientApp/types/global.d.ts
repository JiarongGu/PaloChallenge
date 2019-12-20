/** Global definitions for development **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module "*.less" {
  const styles: any;
  export = styles;
}

declare module "*.scss" {
  const styles: any;
  export = styles;
}

declare module "*.sass" {
  const styles: any;
  export = styles;
}


declare module "*.png"

declare module "*.svg"

declare module 'global' {
  global {
    interface Window { __PRELOADED_STATE__: any; }
  
    interface URLSearchParams {
      keys: () => IterableIterator<string>;
    }
  }
}