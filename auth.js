const SUPABASE_URL =
    "https://bwkpmirlwrsbeiavzapm.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_m5Z5nOdirdaXyoaOoA-fxg_Y_zlNuXJ";


// ========================================
// RENOVAR SESSÃO DO UTILIZADOR
// ========================================

async function renovarSessao() {

    const refreshToken =
        localStorage.getItem("rno_refresh_token");

    if (!refreshToken) {
        return false;
    }

    try {

        const resposta = await fetch(
            SUPABASE_URL +
            "/auth/v1/token?grant_type=refresh_token",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY
                },

                body: JSON.stringify({
                    refresh_token: refreshToken
                })
            }
        );

        const dados =
            await resposta.json();

        if (!resposta.ok) {

            console.error(
                "ERRO AO RENOVAR SESSÃO:",
                dados
            );

            return false;
        }

        // Guardar novo Access Token

        localStorage.setItem(
            "rno_access_token",
            dados.access_token
        );


        // Guardar novo Refresh Token
        // caso o Supabase envie um novo

        if (dados.refresh_token) {

            localStorage.setItem(
                "rno_refresh_token",
                dados.refresh_token
            );

        }


        // Atualizar ID do utilizador,
        // caso esteja disponível

        if (dados.user && dados.user.id) {

            localStorage.setItem(
                "rno_user_id",
                dados.user.id
            );

        }


        console.log(
            "Sessão renovada com sucesso."
        );

        return true;

    } catch (erro) {

        console.error(
            "ERRO DE LIGAÇÃO AO RENOVAR SESSÃO:",
            erro
        );

        return false;
    }
}


// ========================================
// OBTER TOKEN ATUAL
// ========================================

async function obterAccessToken() {

    const accessToken =
        localStorage.getItem("rno_access_token");

    if (!accessToken) {

        return null;

    }

    return accessToken;
}
