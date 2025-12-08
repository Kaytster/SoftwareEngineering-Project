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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const dataToSubmit = {
        itemId: itemId,
        ...formData,
    };
    try {
        const response = await fetch('/api/edit-inventory', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSubmit),
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

  if (loading) {
        return <main className="flex justify-center items-center min-h-screen">Loading item data...</main>;
    }

  if (error && !item) {
      return <main className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</main>;
  }

  if (!item) {
      return <main className="flex justify-center items-center min-h-screen">Item not found.</main>;
  }

  return (
    <main>
        <header>
            <CharityNav />
        </header>

        <div className="relative w-300 h-130 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
            
            {error && <div className="text-red-700 bg-red-100 p-3 mb-4 rounded font-semibold">{error}</div>}
          {successMessage && <div className="text-green-700 bg-green-100 p-3 mb-4 rounded font-semibold">{successMessage}</div>}
            
            <div className="flex space-x-6 h-full">
                <div className="w-1/3 flex  flex-col justify-center items-center">
                    {/* Item Image*/}
                    <Image 
                    src={`/images/${item.currentImageServerName}`}
                    alt={`${item.Category} image`}
                    width={20} 
                    height={20} 
                    className="mr-1 inline-block w-70  h-130 rounded-md " 
                />

                </div>
                {/* col2 */}
                <div className="w-1/3 flex  flex-col justify-center items-center">
                        <div className="relative w-50 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3'>Edit Details</div>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="category" className="block mb-2 mt-5 text-sm font-medium text-[#0C0C0C]">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        id='category'
                                        name='category'
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-40 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4] mb-5"
                                        placeholder="Enter Item Name"
                                    />
                                    <label htmlFor='description' className="block mb-2 text-sm font-medium text-[#0C0C0C]">
                                        Description
                                    </label>
                                    <textarea
                                        id='description'
                                        name='description'
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-40 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4] mb-5"
                                        placeholder="Enter Item Description"
                                    />
                                    {/* <label className="block mb-2 text-sm font-medium text-[#0C0C0C]">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        className="w-40 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4]"
                                        placeholder="Enter Tags"
                                    /> */}
                                    <label htmlFor="colour" className="block mb-1 text-sm font-medium text-[#0C0C0C]">Colour</label>
                                    <input
                                        type="text"
                                        id="colour"
                                        name="colour"
                                        value={formData.colour}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-[#57809A] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#DBEBF4]"
                                    />
                                    <label htmlFor="brand" className="block mb-1 text-sm font-medium text-[#0C0C0C]">Brand</label>
                                    <input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-[#57809A] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#DBEBF4]"
                                    />
                                    <label htmlFor="clothingSize" className="block mb-1 text-sm font-medium text-[#0C0C0C]">Size</label>
                                    <input
                                        type="text"
                                        id="clothingSize"
                                        name="clothingSize"
                                        value={formData.clothingSize}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-[#57809A] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#DBEBF4]"
                                    />
                                    <label htmlFor="newImageServerName" className="block mb-1 text-sm font-medium text-[#0C0C0C]">Image Filename</label>
                                    <input
                                        type="text"
                                        id="newImageServerName"
                                        name="newImageServerName"
                                        value={formData.newImageServerName}
                                        onChange={handleInputChange}
                                        placeholder="e.g., shirt2.png"
                                        className="w-full px-4 py-2 border-2 border-[#57809A] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#DBEBF4]"
                                    />
                                </div>
                            </form>
                        </div>
                        <button type='submit' disabled={submitting} className={`mt-4 w-1/2 bg-[#729458] hover:bg-[#B6D99B] text-white font-bold py-2 px-4 rounded-full transition-colors 
                    ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Submit
                        </button>
                    </div>
                {/* Col 3 */}
                <div className="w-1/3 flex  flex-col justify-center items-center">
                        <div className="relative w-50 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3'>Actions</div>
                            <form className="space-y-4">
                                <div>
                                    
                                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 checked:text-red-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete</label>
                                    <label className="block mb-2 text-sm font-medium text-[#0C0C0C]">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-40 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4] mb-5"
                                        placeholder="Enter Item Description"
                                    />
                                    <label className="block mb-2 text-sm font-medium text-[#0C0C0C]">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        className="w-40 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4]"
                                        placeholder="Enter Tags"
                                    />
                                </div>
                            </form>
                        </div>
                        <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                            Submit
                        </button>
                </div>
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