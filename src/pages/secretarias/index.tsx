

import { useContext, useState } from "react";

import { DataContext } from "../../data/context/dataContext";

import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Secretarias() {

  const { secretarias, setores } = useContext(DataContext);

  const [expanded, setExpanded] = useState<string | false>(false);

  //@ts-ignore
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="grid justify-center mt-8">
      <div className="w-[45rem] border-x border-blue-900" onClick={(e) => e.stopPropagation()}>
        <span className=" px-4 content-center font-semibold">Secretaria</span>
        <div className="pt-4 ">
          {secretarias?.map((secretaria) => {
            return (
              <div
                key={secretaria.id}
                className={`secretaria-item`}
              >
                <Accordion expanded={expanded === `panel-${secretaria.id}`} onChange={handleChange(`panel-${secretaria.id}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${secretaria.id}-content`}
                    id={`panel-${secretaria.id}-header`}
                    sx={{ height: '2rem', fontWeight: expanded === `panel-${secretaria.id}` ? 'semibold' : 'normal' }}
                  >
                    {secretaria.nome}
                  </AccordionSummary>
                  {setores?.filter(setor => setor.fk_secretaria === secretaria.id).map((setor) => (
                    <AccordionDetails key={setor.id} sx={{ padding: '1px 16px' }}>
                      <Typography variant="body2" className='text-xs pl-4 cursor-pointer hover:font-semibold transition-all hover:transition-all'>
                        {setor.nome}
                      </Typography>
                    </AccordionDetails>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
