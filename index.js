const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, MessageFlags } = require('discord.js');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Mapa para rastrear captchas pendentes
const captchaMap = new Map();

client.once('ready', () => {
    console.log(`Bot logado como ${client.user.tag} às ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
});

client.on('messageCreate', async message => {
    if (message.content === '!verificar') {
        const embed = new EmbedBuilder()
            .setTitle('Verificação de Conta')
            .setDescription('Clique no botão abaixo para verificar sua conta e receber o cargo de verificado!')
            .setColor('#7289da');

        const button = new ButtonBuilder()
            .setCustomId('verify_button')
            .setLabel('Verificar')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        await message.channel.send({ embeds: [embed], components: [row], ephemeral: true });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'verify_button') {
        // Adia a resposta inicial
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        // Gera um captcha aleatório (6 caracteres alfanuméricos)
        const captcha = Math.random().toString(36).substring(2, 8);
        captchaMap.set(interaction.user.id, captcha);

        // Cria as opções de captcha (uma correta, duas falsas)
        const options = [captcha];
        while (options.length < 3) {
            const falseCaptcha = Math.random().toString(36).substring(2, 8);
            if (!options.includes(falseCaptcha)) options.push(falseCaptcha);
        }
        options.sort(() => Math.random() - 0.5); // Embaralha as opções

        // Cria os botões para as opções
        const row = new ActionRowBuilder();
        options.forEach(option => {
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(`captcha_${option}`)
                    .setLabel(option)
                    .setStyle(ButtonStyle.Secondary)
            );
        });

        // Envia a embed com o captcha
        const embed = new EmbedBuilder()
            .setTitle('Verificação de Captcha')
            .setDescription(`# \`${captcha}\`\nSelecione a opção correta abaixo.`)
            .setColor('#ffaa00')
            .setFooter({ text: 'Você tem 60 segundos para responder.' });

        await interaction.editReply({ embeds: [embed], components: [row] });

        // Aguarda a resposta do usuário
        const filter = i => i.user.id === interaction.user.id && i.customId.startsWith('captcha_');
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async i => {
            const selectedCaptcha = i.customId.replace('captcha_', '');
            if (selectedCaptcha === captchaMap.get(i.user.id)) {
                // Adiciona o cargo de verificado
                const role = interaction.guild.roles.cache.find(r => r.id === process.env.ROLE_ID);
                if (role) {
                    const member = await interaction.guild.members.fetch(i.user.id);
                    await member.roles.add(role);
                    await i.update({ content: 'Verificação bem-sucedida! Você recebeu o cargo de Verificado.', embeds: [], components: [] });
                } else {
                    await i.update({ content: 'Erro: Cargo "Verificado" não encontrado. Contate um administrador.', embeds: [], components: [] });
                }
            } else {
                await i.update({ content: 'Captcha incorreto! Tente novamente.', embeds: [], components: [] });
            }
            captchaMap.delete(i.user.id);
            collector.stop();
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                interaction.editReply({ content: 'Tempo esgotado! Tente novamente.', embeds: [], components: [] });
            }
            captchaMap.delete(interaction.user.id);
        });
    }
});

// Configura o servidor Express (opcional, para manter o bot ativo)
app.get('/', (req, res) => {
    res.send('Bot de Verificação Ativo');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port} às ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
});

client.login(process.env.DISCORD_TOKEN);