"use client"
import '@/app/globals.css'
import Image from 'next/image';
import CharityNav from '../../components/charityNavigation';

import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { useRouter,  useParams } from 'next/navigation';

interface InventoryItem {
    ItemID: string;
    Category: string;
    Description: string | null;
    Colour: string | null;
    Brand: string | null;
    ClothingSize: string | null;
    ImageID: string;
    currentImageServerName: string;
}

export default function EditInventory() {

  const router = useRouter();
  const params = useParams();
  const itemId = Array.isArray(params.itemId) ? params.itemId[0] : params.itemId;

  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    category: '',
    description: '',
    newImageServerName: '',
    colour: '',
    brand: '',
    clothingSize: '',
  });

  useEffect(() => {
    if (!itemId) return;

    const fetchItemData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/edit-inventory/${itemId}`, {method: 'GET'});
            if (!res.ok) {
                throw new Error(`Failed to fetch item ${itemId}`);
            }
            const fetchedItem: InventoryItem = await res.json();
            setItem(fetchedItem);

            setFormData({
                category: fetchedItem.Category,
                description: fetchedItem.Description || '',
                newImageServerName: fetchedItem.currentImageServerName,
                colour: fetchedItem.Colour || '',
                brand: fetchedItem.Brand || '',
                clothingSize: fetchedItem.ClothingSize || '',
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchItemData();
  }, [itemId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setSubmitting(true);

    const formDataPayload = new FormData();

    formDataPayload.append('itemId', itemId!);
    formDataPayload.append('category', formData.category);
    formDataPayload.append('description', formData.description);
    formDataPayload.append('colour', formData.colour);
    formDataPayload.append('brand', formData.brand);
    formDataPayload.append('clothingSize', formData.clothingSize);

    if (selectedFile) {
        formDataPayload.append('newImageFile', selectedFile);
    } else {
        formDataPayload.append('currentImageServerName', formData.newImageServerName);
    }

    try {
        const response = await fetch('/api/edit-inventory', {
            method: 'PUT',
            //headers: {'Content-Type': 'application/json'},
            body: formDataPayload,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to update item.');
        }
        setSuccessMessage("Item updated successfully! Redirecting...");
        setTimeout(() => {
            router.push('/viewInventory');
        }, 2000)
    } catch (err: any) {
        setError(err.message);
    } finally {
        setSubmitting(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);
    } else {
        setSelectedFile(null);
    }
  };

  if (loading) {
        return <main className="flex justify-center items-center min-h-screen">Loading item data...</main>;
    }

  if (error && !item) {
      return <main className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</main>;
  }

  if (!item) {
      return <main className="flex justify-center items-center min-h-screen">Item not found.</main>;
  }

  //Colours for the drop down menu
  const availableColours = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Pink',
    'White',
    'Black',
    'Silver',
    'Gold',
    'Multi',
    'Other'
  ];
  const availableSizes = [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    'Other'
  ];

  return (
    <main>
        <header>
            <CharityNav />
        </header>

        {/* container1 */}
        <div className="relative w-full max-w-5xl h-130 mx-auto mt-20">

            {/* container2 */}
            <div className="absolute h-fit inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
            
            {error && <div className="text-red-700 bg-red-100 p-3 mb-4 rounded font-semibold">{error}</div>}
          {successMessage && <div className="text-green-700 bg-green-100 p-3 mb-4 rounded font-semibold">{successMessage}</div>}
            
            {/* container3 */}
            <div className="flex space-x-6 h-full">
                {/* container 4 */}
                <div className="w-1/3 flex  flex-col justify-center items-center">
                    {/* Item Image*/}
                    <Image 
                    src={`/images/${item.currentImageServerName}`}
                    alt={`${item.Category} image`}
                    width={200} 
                    height={300} 
                    className="mr-1 inline-block w-70  h-130 rounded-md " 
                />

                </div>
                {/* col2 */}
                {/* container 5 */}
                <div className="w-1/3 flex  flex-col justify-center items-center">
                        <div className="  relative w-full p-4 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block  rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3'>Edit Details</div>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    {/* NAME */}
                                    <label htmlFor="category" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        id='category'
                                        name='category'
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                   border border-gray-200 rounded py-3 px-4 mb-3 
                                                   leading-tight focus:outline-none focus:bg-white'  
                                        placeholder="Enter Item Name"
                                    />
                                    {/* DESCRIPTION */}
                                    <label htmlFor='description' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id='description'
                                        name='description'
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                   border border-gray-200 rounded py-3 px-4 mb-3 
                                                   leading-tight focus:outline-none focus:bg-white' 
                                        placeholder="Enter Item Description"
                                    />
                                     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                     {/* COLOUR */}
                                        <label htmlFor="colour" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Colour</label>
                                        <select
                                            id="colour"
                                            name="colour"
                                            value={formData.colour}
                                            onChange={handleInputChange}
                                            className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                   border border-gray-200 rounded py-3 px-4 mb-3 
                                                   leading-tight focus:outline-none focus:bg-white' 
                                        > 
                                            {availableColours.map((colour) => (
                                                <option key={colour} value={colour}>
                                                    {colour}
                                                </option>
                                            ))}
                                        </select>
                                        {/* BRAND */}
                                        <label htmlFor="brand" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Brand</label>
                                        <input
                                            type="text"
                                            id="brand"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleInputChange}
                                            className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                   border border-gray-200 rounded py-3 px-4 mb-3 
                                                   leading-tight focus:outline-none focus:bg-white' 
                                        />
                                     </div>
                                     {/* SIZE */}
                                    <label htmlFor="clothingSize" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Size</label>
                                    <select
                                            id="clothingSize"
                                            name="clothingSize"
                                            value={formData.clothingSize}
                                            onChange={handleInputChange}
                                            className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                   border border-gray-200 rounded py-3 px-4 mb-3 
                                                   leading-tight focus:outline-none focus:bg-white' 
                                        > 
                                            {availableSizes.map((size) => (
                                                <option key={size} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                    {/* IMAGE */}
                                    <label htmlFor="newImageServerName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Upload New Image</label>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        name="imageFile"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                   border border-gray-200 rounded py-3 px-4 mb-3 
                                                   leading-tight focus:outline-none focus:bg-white' 
                                    />
                                    {selectedFile && (
                                        <p className='mt-1 text-xs text-[#0C0C0C'>
                                            File selected: {selectedFile.name}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                        <button type='submit' disabled={submitting} className={`mt-4 w-1/2 bg-[#729458] hover:bg-[#B6D99B] text-white font-bold py-2 px-4 rounded-full transition-colors 
                    ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Submit
                        </button>
                    </div>
                {/* Col 3 */}
                
                </div>
            </div>  
        </div>
    </main>
  )
}


{/* Col 3: Actions (e.g., Delete) */}
//             <div className="w-1/3 flex flex-col items-center">
//               <div className="relative w-full bg-[#9CB7C8] rounded-md flex flex-col items-center p-4"> 
//                 <div className='inline-block rounded-md bg-[#729458] text-white text-2xl px-3 mb-4'>
//                   Actions
//                 </div>
                
//                 {/* Separate form or logic for Delete */}
//                 <div className="flex items-center space-x-2 mb-4">
//                   <input id="delete-checkbox" type="checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded" />
//                   <label htmlFor="delete-checkbox" className="text-sm font-medium text-red-900">Mark for Deletion</label>
//                 </div>
                
//                 {/* The tags and description inputs were redundant here based on your screenshot; 
//                     I'm removing them and leaving the Delete action logic. 
//                 */}
//               </div>
              
//               {/* Secondary Submit Button (Can be for Delete, or just linked to the primary form if only one action) */}
//               <button className="mt-4 w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
//                 Delete Item
//               </button>
//             </div>
            
//           </div>
//         </div>  
//       </div>
//     </main>
//   );