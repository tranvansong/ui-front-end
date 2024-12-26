import React, { useState, useEffect } from 'react';
import {dataProvinces} from '../../assets/dataProvinces';

function LocationSelector({ onLocationChange }) {
  const [tinh, setTinh] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState('');
  const [quan, setQuan] = useState([]);
  const [selectedQuan, setSelectedQuan] = useState('');
  const [phuong, setPhuong] = useState([]);
  const [selectedPhuong, setSelectedPhuong] = useState('');

  useEffect(() => {
    setTinh(dataProvinces);
  }, []);

  useEffect(() => {
    if (selectedTinh) {
      const selectedProvince = tinh.find(t => t.name === selectedTinh);
      setQuan(selectedProvince ? selectedProvince.districts : []);
      setSelectedQuan(''); 
      setPhuong([]); //
      setSelectedPhuong('');
    }
  }, [selectedTinh, tinh]);

  useEffect(() => {
    if (selectedQuan) {
      const selectedDistrict = quan.find(q => q.name === selectedQuan);
      setPhuong(selectedDistrict ? selectedDistrict.wards : []);
      setSelectedPhuong('');
    }
  }, [selectedQuan, quan]);

  return (
    <div className="">
      <select 
        className="p-2 border border-gray-200 text-base w-full shadow outline-none focus:border-bluelight" 
        id="tinh" 
        name="tinh" 
        title="Chọn Tỉnh Thành"
        value={selectedTinh}
        onChange={e => {
          setSelectedTinh(e.target.value);
          onLocationChange({ selectedTinh: e.target.value, selectedQuan: '', selectedPhuong: '' });
        }}
      >
        <option value="">Tỉnh Thành</option>
        {tinh.map(t => (
          <option key={t.code} value={t.name}>{t.name}</option>
        ))}
      </select> 
      
      <div className="flex gap-x-8">
        <select 
          className="p-2 border border-gray-200 text-base w-1/2 shadow mt-5 outline-none focus:border-bluelight" 
          id="quan" 
          name="quan" 
          title="Chọn Quận Huyện"
          value={selectedQuan}
          onChange={e => {
            setSelectedQuan(e.target.value);
            onLocationChange({ selectedTinh, selectedQuan: e.target.value, selectedPhuong: '' });
          }}
          disabled={!selectedTinh}
        >
          <option value="">Quận Huyện</option>
          {quan.map(q => (
            <option key={q.code} value={q.name}>{q.name}</option>
          ))}
        </select> 
        
        <select 
          className="p-2 border border-gray-200 text-base w-1/2 shadow mt-5 outline-none focus:border-bluelight" 
          id="phuong" 
          name="phuong" 
          title="Chọn Phường Xã"
          value={selectedPhuong}
          onChange={e => {
            setSelectedPhuong(e.target.value);
            onLocationChange({ selectedTinh, selectedQuan, selectedPhuong: e.target.value });
          }}
          disabled={!selectedQuan}
        >
          <option value="">Phường Xã</option>
          {phuong.map(p => (
            <option key={p.code} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LocationSelector;
