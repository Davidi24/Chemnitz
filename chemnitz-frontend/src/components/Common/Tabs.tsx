import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { HeaderDataType } from '@/types/ComponetsType';

interface Props {
  onCategoryChange: (category: string, idx: number) => void;
  headerData: HeaderDataType[];
  selectedIndex: number;
}

export default function ScrollableTabsButtonAuto({ onCategoryChange, headerData, selectedIndex }: Props) {
  const [value, setValue] = React.useState(selectedIndex);

  React.useEffect(() => {
    setValue(selectedIndex);
  }, [selectedIndex]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onCategoryChange(headerData[newValue].name.toLowerCase(), newValue);
  };

  return (
    <Box sx={{ maxWidth: { lg: 680 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { backgroundColor: '#df6c36' } }}
        sx={{
          '& .MuiTabs-scrollButtons': {
            color: 'brown',
            '&.Mui-disabled': {
              display: 'none',
            },
          },
          '& .MuiTab-root.Mui-selected': {
            color: '#df6c36',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
          },
        }}
      >
        {headerData.map((item, index) => (
          <Tab
            key={index}
            label={item.name}
            icon={item.icon ? <item.icon /> : undefined}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  );
}
