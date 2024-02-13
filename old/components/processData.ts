import { locs } from '../storage/data.json';

interface DataProps {
  url: string;
}

const processingData = (data: DataProps[]): { url: string } => {
  const base = data[0].url;
  const newData = {
    url: base,
    children:[],
  };

  data.forEach(({ url }) => {
    //console.log(newData)
    let path = url;

    if (url.startsWith(base) === true) {
      path = url.substring(base.length, url.length);
      //console.log("sub", path)
    }

    if (path === '') { return }

    if (path.includes('/') === true) {
      if (newData.children.includes('/') === false) {
        newData.children.push({ url: path, children:[] });
      };
    } else {
      const parent = path.substring((path.indexOf('/')+1));
      const arrayIterator = newData.children.values()
      for (const search of arrayIterator) {
        const parentCompare = search.url.substring(0, (search.url.indexOf('/')-1))
        const parentInsideObject = parent === parentCompare
        console.log("parentCompare",parentCompare)

        if (!parentInsideObject) {
          let makeParent = data.find(d => d.url === base + parent);
          console.log("makeParent", makeParent)
          if (!makeParent) {
            makeParent = {
              url: parent,
            }
          } else {
            console.log("quick",makeParent.url)
            const parentInObject = makeParent.url.substring(base.length, makeParent.url.length)
            const parentObjIndex = newData.children.[].push(makeParent)

            const hasParentInsideObject = newData.children[parentObjIndex-1];
            console.log("parentObjIndex",parentObjIndex)
            console.log("hasParenteInsideObject",hasParentInsideObject)
          }

        }
      }

      

      path = path.substring(path.indexOf('/') + 1, path.length);
      if (hasParentInsideObject.children) {
        hasParentInsideObject.children.push({url: path});
      } else {
        hasParentInsideObject.children = [{url: path}];
      }
    }
  });
  return newData;
};

export const processData = processingData(locs)
