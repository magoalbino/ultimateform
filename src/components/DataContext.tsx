import {createContext, ReactNode, useContext, useState} from "react";
import {FieldValues} from "react-hook-form";

interface DataProviderProps {
  children: ReactNode;
}

interface DataContextData {
  data: FieldValues;
  setFormValues: (values: FieldValues) => void;
}

const DataContext = createContext({} as DataContextData)

export const DataProvider = ({children}: DataProviderProps) => {
  const [data, setData] = useState<FieldValues>({})

  const setFormValues = (values: FieldValues) => {
    setData(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return (
    <DataContext.Provider value={{data, setFormValues}}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
