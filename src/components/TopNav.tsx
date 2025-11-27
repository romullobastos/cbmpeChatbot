import React from 'react';
import { Screen } from '../App';

interface TopNavProps {
	onNavigate: (screen: Screen) => void;
}

export function TopNav({ onNavigate }: TopNavProps) {
	return (
		<div className="hidden md:block w-full bg-white border-b border-red-200">
			<div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 bg-red-700 rounded-full overflow-hidden flex items-center justify-center">
						<img
							src="https://soge.bombeiros.pe.gov.br/assets/logo_cbmpe-0b92da2a2895c00fe13b07d9fe5a97e63fe87bf662dc310e8215944764735104.png"
							alt="CBMPE"
							className="w-6 h-6 object-contain"
						/>
					</div>
					<span className="text-gray-900 font-medium">CBMPE Digital</span>
				</div>

				<nav className="flex items-center gap-8 text-sm text-gray-700">
					<a className="hover:text-gray-900 cursor-default">Serviços</a>
					<a className="hover:text-gray-900 cursor-default">Como Funciona</a>
					<a className="hover:text-gray-900 cursor-default">Contato</a>
					<button
						onClick={() => onNavigate('login')}
						className="ml-4 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
					>
						Entrar
					</button>
				</nav>
			</div>
			<div className="h-1 w-full bg-gradient-to-r from-red-600 to-red-700" />
		</div>
	);
}


