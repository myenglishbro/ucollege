import React from 'react';
import Modal from '../common/Modal';

/**
 * RewardPopup component
 * @param {{
 *   isOpen: boolean;
 *   rewardImg: string;
 *   description: string;
 *   onClose: () => void;
 * }} props
 */
export default function RewardPopup({ isOpen, rewardImg, description, onClose }) {
  return (
    <Modal isOpen={isOpen} title="Epic Reward" onClose={onClose}>
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 mb-4 bg-gray-800 flex items-center justify-center rounded-lg overflow-hidden">
          <img src={rewardImg} alt="Reward" className="max-w-full max-h-full" />
        </div>
        <p className="text-gray-200 text-center mb-4">{description}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
