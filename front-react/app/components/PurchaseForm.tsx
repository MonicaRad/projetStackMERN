'use client'; // Toujours nécessaire car on gère des clics et des pop-ups !

import { useState } from 'react';
import Link from 'next/link';

export default function PurchaseForm({ movieId, movieTitle, price }: { movieId: string, movieTitle: string, price: number }) {
  // --- ÉTATS (STATE) ---
  // 1. Savoir si le film a été cliqué pour être mis au panier
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // 2. Savoir si la pop-up (modale) est ouverte ou fermée
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Gérer le chargement lors de la validation du formulaire final
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // --- ACTIONS ---
  const handleAddToCart = () => {
    // Ici, plus tard, on enverra l'info au "vrai" panier global
    setIsAddedToCart(true);
  };

  const handleFinalizeOrder = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche la page de se recharger lors du clic sur Submit
    setLoading(true);

    try {
      // Simulation de l'API de ton collègue backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // --- RENDU (UI) ---
  return (
    <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Acheter {movieTitle}</h3>
      <p className="mb-6 text-gray-700">Prix : <span className="font-bold text-xl">{price} €</span></p>

      {/* --- BLOC 1 : LE BOUTON PANIER OU LES CHOIX --- */}
      {!isAddedToCart ? (
        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Ajouter au panier 🛒
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm text-center mb-2 font-medium">
            ✅ Ajouté au panier avec succès !
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-colors"
          >
            Passer commande
          </button>
          <Link 
            href="/" 
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg text-center transition-colors"
          >
            Continuer mes achats
          </Link>
        </div>
      )}

      {/* --- BLOC 2 : LA MODALE (POP-UP) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            
            {/* En-tête de la modale */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Finaliser la commande</h2>
              <button 
                onClick={() => { setIsModalOpen(false); setStatus('idle'); }} 
                className="text-gray-400 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Contenu de la modale (Succès ou Formulaire) */}
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-600 mb-2">Commande validée !</h3>
                <p className="text-gray-600 mb-6">Merci pour votre achat. Préparez le pop-corn !</p>
                <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Retour à l'accueil
                </Link>
              </div>
            ) : (
              <form onSubmit={handleFinalizeOrder} className="flex flex-col gap-4">
                <p className="text-gray-600 text-sm mb-2">Veuillez confirmer vos informations pour l'achat de <strong>{movieTitle}</strong>.</p>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Nom complet</label>
                  <input type="text" required className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jean Dupont" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" required className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="jean@exemple.com" />
                </div>

                <div className="border-t pt-4 mt-2 font-bold flex justify-between text-lg">
                  <span>Total à payer :</span>
                  <span>{price} €</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg text-white font-semibold mt-4 transition-colors ${
                    loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {loading ? 'Traitement en cours...' : 'Payer et Valider'}
                </button>
                {status === 'error' && <p className="text-red-500 text-sm text-center">Une erreur est survenue.</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}