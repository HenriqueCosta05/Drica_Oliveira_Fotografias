import React from 'react';
import 'dotenv/config';

export default function Form() {
    const FORM_ACTION = process.env.FORM_ACTION;

    return (
        <form className="w-11/12 mx-auto p-4 lg:p-28 bg-indigo-200 rounded-md" method="post" action={FORM_ACTION}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="nome"
                    >
                        Nome
                    </label>
                    <input
                        className="appearance-auto block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition-colors"
                        id="nome"
                        type="text"
                        placeholder="Pedro"
                        required
                        name="nome"
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                    >
                        E-mail
                    </label>
                    <input
                        className="appearance-auto block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition-colors"
                        id="email"
                        type="email"
                        required
                        name="email"
                        placeholder="pedro@gmail.com"
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="celular"
                    >
                        Telefone Celular
                    </label>
                    <input
                        className="appearance-auto block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition-colors"
                        id="celular"
                        type="tel"
                        name="celular"
                        placeholder="(11) 99999-9999"
                        required
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="mensagem"
                    >
                        Mensagem (opcional)
                    </label>
                    <textarea
                        className="appearance-auto h-[200px] block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition-colors"
                        id="mensagem"
                        name="mensagem"
                        placeholder="Digite sua mensagem, se desejar..."
                    />
                </div>
                <div className="mx-auto mt-8">
                    <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline">
                        Enviar
                    </button>
                </div>
            </div>
        </form>
    );
}