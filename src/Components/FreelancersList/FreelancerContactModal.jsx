import React, { useEffect, useState } from "react";
import { FiX, FiSend } from "react-icons/fi";

/**
 * Modal para contactar freelancer
 */
const FreelancerContactModal = ({
	isOpen,
	onClose,
	freelancer,
	onSendMessage,
}) => {
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isOpen && freelancer) {
			setMessage(
				`Hi ${freelancer.name}, I'm interested in working with you on a project.`
			);
		}
	}, [isOpen, freelancer]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;

		setIsLoading(true);
		try {
			await onSendMessage(message.trim());
			onClose();
			setMessage("");
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	if (!isOpen || !freelancer) return null;

	return (
		<div
			className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
			onClick={(e) => e.target === e.currentTarget && onClose()}
		>
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-gray-800/50 shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-800/50">
					<h3 className="text-xl font-semibold text-white">
						Contact {freelancer.name}
					</h3>
					<button
						onClick={onClose}
						className="bg-gray-800/90 hover:bg-gray-700/90 p-2 rounded-full transition-colors"
						disabled={isLoading}
					>
						<FiX className="w-5 h-5 text-gray-300" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6">
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Message
						</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Write your message here..."
							rows={4}
							className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
							disabled={isLoading}
							required
						/>
					</div>

					{/* Buttons */}
					<div className="flex gap-3 justify-end">
						<button
							type="button"
							onClick={onClose}
							onKeyDown={handleKeyDown}
							className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/50"
							disabled={isLoading}
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isLoading || !message.trim()}
							className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<>
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									Sending...
								</>
							) : (
								<>
									<FiSend className="w-4 h-4" />
									Send Message
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FreelancerContactModal;
